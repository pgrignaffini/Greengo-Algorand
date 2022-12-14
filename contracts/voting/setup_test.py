import base64

from algosdk.v2client.algod import AlgodClient
from algosdk.kmd import KMDClient
from algosdk import encoding

from setup import getAlgodClient, getKmdClient, getGenesisAccounts


def test_getAlgodClient():
    client = getAlgodClient()
    assert isinstance(client, AlgodClient)

    response = client.health()
    assert response is None


def test_getKmdClient():
    client = getKmdClient()
    assert isinstance(client, KMDClient)

    response = client.versions()
    expected = ["v1"]
    assert response == expected


def test_getGenesisAccounts():
    accounts = getGenesisAccounts()

    assert len(accounts) == 3
    assert all(encoding.is_valid_address(account.getAddress()) for account in accounts)
    assert all(
        len(base64.b64decode(account.getPrivateKey())) == 64 for account in accounts
    )
