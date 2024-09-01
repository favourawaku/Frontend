import { useState, useEffect } from "react";
import { ethers } from "ethers";
import atm_abi from "../artifacts/contracts/Assessment.sol/UserProfile.json";

export default function HomePage() {
  const [ethWallet, setEthWallet] = useState(undefined);
  const [account, setAccount] = useState(undefined);
  const [atm, setATM] = useState(undefined);
  const [page, setPage] = useState(false);
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [email, setEmail] = useState("");
  const [addr, setAddr] = useState("");

  const [newName, setNewname] = useState("");
  const [newAge, setNewage] = useState("");
  const [newEmail, setNewemail] = useState("");

  const contractAddress = "0x4C231b8EfE8597842d578Ddad479D8998183bA74";
  const atmABI = atm_abi.abi;

  const getWallet = async () => {
    if (window.ethereum) {
      setEthWallet(window.ethereum);
    }

    if (ethWallet) {
      const account = await ethWallet.request({ method: "eth_accounts" });
      handleAccount(account);
    }
  };

  const handleAccount = (account) => {
    if (account) {
      console.log("Account connected: ", account);
      setAccount(account);
    } else {
      console.log("No account found");
    }
  };

  const connectAccount = async () => {
    if (!ethWallet) {
      alert("MetaMask wallet is required to connect");
      return;
    }

    const accounts = await ethWallet.request({ method: "eth_requestAccounts" });
    handleAccount(accounts);

    // once wallet is set we can get a reference to our deployed contract
    getATMContract();
  };

  const getATMContract = () => {
    const provider = new ethers.providers.Web3Provider(ethWallet);
    const signer = provider.getSigner();
    const atmContract = new ethers.Contract(contractAddress, atmABI, signer);

    setATM(atmContract);
  };

  // setting profile
  const setUserProfile = async () => {
    if (!name && !email && !age) return;
    if (atm) {
      try {
        const tx = await atm.setProfile(name, age, email);
        await tx.wait();
        setName("");
        setAge("");
        setEmail("");
      } catch (error) {
        console.error("Error sending message:", error);
      }
    }
  };

  //  getting profile
  const getUserProfile = async () => {
    if (!addr) return;
    if (atm) {
      try {
        let profile = await atm.getProfile(addr);

        setAddr("");
        const [newname, newage, newemail] = profile;

        setNewname(newname);
        setNewage(newage);
        setNewemail(newemail);
      } catch (error) {
        console.error("Error sending message:", error);
      }
    }
    setPage(true);
  };

  function handleClose() {
    setPage(false);
    setNewname("");
    setNewage("");
    setNewemail("");
  }

  useEffect(() => {
    getWallet();
  }, []);

  return (
    <main className="container">
      <header>
        <h1>Welcome to the Metacrafters Social Media Page</h1>
      </header>
      <div className="user-interface">
        {!ethWallet && (
          <p className="connect-message">
            Please install MetaMask in order to use this ATM.
          </p>
        )}
        {ethWallet && !account && (
          <button className="connect-button" onClick={connectAccount}>
            Connect Metamask Wallet
          </button>
        )}
        {account && !page && (
          <>
            <div className="con">
              <div className="c">
                <div className="message-section">
                  <h2>Register</h2>
                  <input
                    className="input-field"
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  <br />
                  <input
                    className="input-field"
                    type="text"
                    placeholder="Age"
                    value={age}
                    onChange={(e) => setAge(Number(e.target.value))}
                  />
                  <br />
                  <input
                    className="input-field"
                    type="text"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <br />
                  <button className="action-button" onClick={setUserProfile}>
                    Register
                  </button>
                </div>

                <div className="message-section">
                  <input
                    className="input-field"
                    type="text"
                    placeholder="address"
                    value={addr}
                    onChange={(e) => setAddr(e.target.value)}
                  />
                  <br />

                  <button className="action-button" onClick={getUserProfile}>
                    View Profile
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
      {page && (
        <div className="message-section">
          <h2>User Profile</h2>
          <label>Name:</label>
          <br />
          <input className="input-field" type="text" value={newName} disabled />
          <br />
          <label>Age:</label>
          <br />
          <input className="input-field" type="text" value={newAge} disabled />
          <br />
          <label>Email:</label>
          <br />
          <input
            className="input-field"
            type="text"
            value={newEmail}
            disabled
          />
          <br />
          <button
            className="action-button"
            onClick={handleClose}
            style={{ backgroundColor: "red", color: "white" }}
          >
            close
          </button>
        </div>
      )}

      <style jsx>{`
        .con {
          display: flex;
          flex-direction: column;
        }

        .c {
          display: flex;
          flex-direction: row;
          gap: 100px;
        }
        .container {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 20px;
        }
        header {
          margin-bottom: 20px;
        }
        .connect-message {
          font-size: 18px;
          color: red;
          margin-bottom: 20px;
        }
        .connect-button {
          background-color: #4caf50;
          color: white;
          padding: 10px 20px;
          border: none;
          border-radius: 5px;
          font-size: 16px;
          cursor: pointer;
        }
        .user-interface {
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .message-section {
          margin-top: 20px;
        }
        .heading {
          font-size: 24px;
          margin-bottom: 10px;
        }
        .input-field {
          padding: 10px;
          margin-bottom: 10px;
          border: 1px solid #ccc;
          border-radius: 5px;
          width: 300px;
          font-size: 16px;
        }
        .action-button {
          background-color: #4caf50;
          color: white;
          padding: 10px 20px;
          border: none;
          border-radius: 5px;
          font-size: 16px;
          cursor: pointer;
          margin-right: 10px;
        }
        .message {
          font-size: 18px;
          margin-top: 10px;
        }
      `}</style>
    </main>
  );
}
