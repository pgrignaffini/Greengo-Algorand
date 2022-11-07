from typing import Tuple

from algosdk.v2client.algod import AlgodClient
from algosdk.future import transaction
from algosdk.logic import get_application_address
from algosdk import account, encoding

from account import Account
from contract import approval_program, clear_state_program
from util import (
    waitForTransaction,
    fullyCompileContract,
)

APPROVAL_PROGRAM = b""
CLEAR_STATE_PROGRAM = b""

PLATFORM_FEE = 5_000  # 0.005 Algo


def getContracts(client: AlgodClient) -> Tuple[bytes, bytes]:
    """Get the compiled TEAL contracts for the crowdfunding.

    Args:
        client: An algod client that has the ability to compile TEAL programs.

    Returns:
        A tuple of 2 byte strings. The first is the approval program, and the
        second is the clear state program.
    """
    global APPROVAL_PROGRAM
    global CLEAR_STATE_PROGRAM

    if len(APPROVAL_PROGRAM) == 0:
        APPROVAL_PROGRAM = fullyCompileContract(client, approval_program())
        CLEAR_STATE_PROGRAM = fullyCompileContract(client, clear_state_program())

    f = open("myfile.teal", "wb")
    f.write(APPROVAL_PROGRAM)

    return APPROVAL_PROGRAM, CLEAR_STATE_PROGRAM


def createVotingApp(client: AlgodClient, creator: Account) -> int:
    """Create a new voting.

    Args:
        client: An algod client.
        creator: The address of the creator of the crowdfunded project
        RegBegin: The registration begin date
        RegEnd: The registration end date
        VoteBegin: The voting begin date
        VoteEnd: The voting end date

    Returns:
        The ID of the newly created voting app.
    """
    approval, clear = getContracts(client)

    # declare application state storage (immutable)
    local_ints = 1
    local_bytes = 1
    global_ints = (
        24  # 4 for setup + 20 for choices. Use a larger number for more choices.
    )
    global_bytes = 2
    globalSchema = transaction.StateSchema(global_ints, global_bytes)
    localSchema = transaction.StateSchema(local_ints, local_bytes)

    status = client.status()
    regBegin = status["last-round"] + 10
    regEnd = regBegin + 10
    voteBegin = regEnd + 10
    voteEnd = voteBegin + 10

    app_args = [
        regBegin.to_bytes(8, "big"),
        regEnd.to_bytes(8, "big"),
        voteBegin.to_bytes(8, "big"),
        voteEnd.to_bytes(8, "big"),
    ]

    txn = transaction.ApplicationCreateTxn(
        sender=creator.getAddress(),
        on_complete=transaction.OnComplete.NoOpOC,
        approval_program=approval,
        clear_program=clear,
        global_schema=globalSchema,
        local_schema=localSchema,
        app_args=app_args,
        sp=client.suggested_params(),
    )

    signedTxn = txn.sign(creator.getPrivateKey())

    client.send_transaction(signedTxn)

    response = waitForTransaction(client, signedTxn.get_txid())
    assert response.applicationIndex is not None and response.applicationIndex > 0
    return response.applicationIndex


def registerVoter(client: AlgodClient, appID: int, voter: Account) -> None:
    """Register a voter.

    Args:
        client: An Algod client.
        appID: The app ID of the voting.
        voter: The account of the voter.
    """

    appCallTxn = transaction.ApplicationCallTxn(
        sender=voter.getAddress(),
        index=appID,
        on_complete=transaction.OnComplete.NoOpOC,
        app_args=[b"on_register"],
        sp=client.suggested_params(),
    )

    signedAppCallTxn = appCallTxn.sign(voter.getPrivateKey())

    client.send_transaction(signedAppCallTxn)

    waitForTransaction(client, appCallTxn.get_txid())


def sendFunds(
    client: AlgodClient, appID: int, funder: Account, platform: Account, fundAmount: int
) -> None:
    """Send funds to crowdfunding.

    Args:
        client: An Algod client.
        appID: The app ID of the auction.
        funder: The account providing the funds.
        fundAmount: The amount of the fund.
    """

    appAddr = get_application_address(appID)

    suggestedParams = client.suggested_params()

    fundTxn = transaction.PaymentTxn(
        sender=funder.getAddress(),
        receiver=appAddr,
        amt=fundAmount - PLATFORM_FEE,
        sp=suggestedParams,
    )

    payFeesTxn = transaction.PaymentTxn(
        sender=funder.getAddress(),
        receiver=platform.getAddress(),
        amt=PLATFORM_FEE,
        sp=suggestedParams,
    )

    appCallTxn = transaction.ApplicationCallTxn(
        sender=funder.getAddress(),
        index=appID,
        on_complete=transaction.OnComplete.NoOpOC,
        app_args=[b"fund"],
        sp=suggestedParams,
    )

    transaction.assign_group_id([fundTxn, payFeesTxn, appCallTxn])

    signedFundTxn = fundTxn.sign(funder.getPrivateKey())
    signedPayFeesTxn = payFeesTxn.sign(funder.getPrivateKey())
    signedAppCallTxn = appCallTxn.sign(funder.getPrivateKey())

    client.send_transactions([signedFundTxn, signedPayFeesTxn, signedAppCallTxn])

    waitForTransaction(client, appCallTxn.get_txid())


def sendRefunds(client: AlgodClient, appID: int, user: Account) -> None:
    """Send funds to crowdfunding.

    Args:
        client: An Algod client.
        appID: The app ID of the auction.
        funder: The account providing the funds.
    """
    suggestedParams = client.suggested_params()

    refundTxn = transaction.ApplicationCallTxn(
        sender=user.getAddress(),
        index=appID,
        on_complete=transaction.OnComplete.NoOpOC,
        app_args=[b"refund"],
        sp=suggestedParams,
    )

    signedRefundTxn = refundTxn.sign(user.getPrivateKey())

    client.send_transaction(signedRefundTxn)

    waitForTransaction(client, signedRefundTxn.get_txid())


def closeCrowdfunding(client: AlgodClient, appID: int, closer: Account):

    deleteTxn = transaction.ApplicationDeleteTxn(
        sender=closer.getAddress(),
        index=appID,
        sp=client.suggested_params(),
    )
    signedDeleteTxn = deleteTxn.sign(closer.getPrivateKey())

    client.send_transaction(signedDeleteTxn)

    waitForTransaction(client, signedDeleteTxn.get_txid())
