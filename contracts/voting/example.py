from email.utils import getaddresses
from time import time, sleep

from algosdk.logic import get_application_address
from operations import createVotingApp
from util import (
    getBalances,
    getAppGlobalState,
    getLastBlockTimestamp,
)
from setup import getAlgodClient
from resources import getTemporaryAccount, optInApp


def simple_voting():
    client = getAlgodClient()

    print("Generating temporary accounts...")
    creator = getTemporaryAccount(client)
    voter_1 = getTemporaryAccount(client)
    voter_2 = getTemporaryAccount(client)

    print("Bob is creating a voting app...")
    appID = createVotingApp(
        client=client,
        creator=creator,
    )
    print(
        "Done. The voting app ID is",
        appID,
    )


simple_voting()
