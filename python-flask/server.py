import os
from dotenv import load_dotenv
from flask import Flask, request, jsonify
from web3 import Web3
from eth_account import Account
from eth_account.signers.local import LocalAccount

load_dotenv()

w3 = Web3(Web3.HTTPProvider('https://staging-v3.skalenodes.com/v1/staging-fast-active-bellatrix'))
address = '0xCD1cb5032F4C854cbc4646214eD9ab3BbDe37062'
abi = '[{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"burn","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"subtractedValue","type":"uint256"}],"name":"decreaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"addedValue","type":"uint256"}],"name":"increaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"mint","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"score","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"}]'
contract_instance = w3.eth.contract(address=address, abi=abi)
CUSTODIAN_PRIVATE_KEY = os.getenv('CUSTODIAN_PRIVATE_KEY')
account: LocalAccount = Account.from_key(CUSTODIAN_PRIVATE_KEY)
nonce = 0
users = {}

def create_new_account(userId):
    users[userId] = w3.eth.account.create();

def getUserAccount(userId):
    if users.get(userId) == None:
        create_new_account(userId);
        distribute(users.get(userId).address)
    return users.get(userId)
        

def distribute(addr):
    print(nonce)
    transaction = {
        'from': account.address,
        'to': addr,
        'value': 100000000000,
        'nonce': w3.eth.get_transaction_count(account.address),
        'gas': 100000,
        'gasPrice': 100000
    }

    # 2. Sign tx with a private key
    signed = w3.eth.account.sign_transaction(transaction, private_key=account.key)

    # 3. Send the signed transaction
    tx_hash = w3.eth.send_raw_transaction(signed.rawTransaction)
    receipt = w3.eth.wait_for_transaction_receipt(tx_hash)

def create_app(test_config=None):

    app = Flask(__name__)

    # Mint Function
    @app.route('/mint', methods=['POST'])
    def mint():
        data = request.json
        userAccount = getUserAccount(data["userId"])
        unsigned_tx = contract_instance.functions.mint(userAccount.address, 1).build_transaction({
            "from": userAccount.address,
            "nonce": w3.eth.get_transaction_count(userAccount.address),
            'gas': 100000,
            'gasPrice': 100000
        })

        signed_tx = w3.eth.account.sign_transaction(unsigned_tx, private_key=userAccount.key)
        tx_hash = w3.eth.send_raw_transaction(signed_tx.rawTransaction)
        w3.eth.wait_for_transaction_receipt(tx_hash)

        return 'Minted Successfully'
    
    @app.route('/burn', methods=['POST'])
    def burn():
        data = request.json
        userAccount = getUserAccount(data["userId"])
        unsigned_tx = contract_instance.functions.burn(data.get("amount") or 1).build_transaction({
            "from": userAccount.address,
            "nonce": w3.eth.get_transaction_count(userAccount.address),
            'gas': 100000,
            'gasPrice': 100000
        })

        signed_tx = w3.eth.account.sign_transaction(unsigned_tx, private_key=userAccount.key)
        tx_hash = w3.eth.send_raw_transaction(signed_tx.rawTransaction)
        w3.eth.wait_for_transaction_receipt(tx_hash)

        return 'Burned Successfully'

    return app