import React, { useState } from "react";
import "./sidebar.css";
import WhiteBoard from "../whiteboard/whiteBoard";

const SideBar = (props) => {

  const [msg, setMsg] = useState("")


  let rooms = <li>Connect to a WorkSpace to get Channels</li>;
  if (!!props.rooms.length) {
    rooms = props.rooms.map((room, idx) => {
      return (
        <li
          key={idx}
          className={
            !!props.activeRoom && props.activeRoom.name === room.name
              ? "active"
              : ""
          }
          onClick={() => props.handleRoomClick(idx)}
        >
          <span className="glyphicon glyphicon-globe"></span>
          {room.name}
        </li>
      );
    });
  }

  let roomInfo = (
    <div
      className="col-sm-8"
      style={{
        backgroundColor: "black",
        height: "100vh",
        alignItems: "center",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <p>Connect to WorkSpace and Channel to chat</p>
    </div>
  );

  if (props.activeRoom) {
    roomInfo = (
      <div
        className="chat-panel col-sm-8"
      >
        <div className="room-header row col-6">
          <div className="col-sm-5 title">
            <span className="curr-room-text">{props.activeRoom.name}</span>{" "}
            <span className="curr-room-num-users">
            <span style={{marginRight: '5px'}}><i class="fas fa-users"></i></span>
              {props.numClients}
            </span>
          </div>
          {/* <div className="col-sm-3 search pull-right">
            <span className="glyphicon glyphicon-search"></span>
            <input type="text" id="search-box" placeholder="Search" />
          </div> */}
          <div className="white-board">
            <button onClick={props.openWhiteBoard}>WhiteBoard</button>
          </div>
        </div>
        <div className="message-form">
          <form id="user-input" onSubmit={e => {
            props.handleMsgSubmit(e, msg)
            setMsg("")  
          }}>
            <div className="col-sm-12">
              <input
                id="user-message"
                type="text"
                placeholder="Enter your message"
                onChange={e => setMsg(e.target.value)}
                value={msg}
              />
            </div>
          </form>
        </div>
        <ul id="messages" className="col-sm-12">
          {props.messages.map((msg, idx) => {
            const date = new Date(msg.date)
            return(
              <li key={idx}>
              <div className="user-image">
                <div></div>
                <div className="user-message">
                  <div className="user-name-time">
                    {msg.user}
                    <div>{`${date.toLocaleDateString()}`}</div>
                    <div>{`${date.toLocaleTimeString()}`}</div>
                  </div>
                </div>
              </div>
              <div className="message-text">
                {msg.msg}
              </div>
            </li>
            )
          })}
        </ul>
      </div>
    );
  }
  if(props.isWhiteBoardOpen){
    roomInfo = (
      <div
        className="chat-panel col-sm-8"
      >
        <div className="room-header row col-6">
          <div className="col-sm-5 title">
            <span className="curr-room-text">{props.activeRoom.name}</span>{" "}
            <span className="curr-room-num-users">
            <span style={{marginRight: '5px'}}><i class="fas fa-users"></i></span>
              {props.numClients}
            </span>
          </div>
          {/* <div className="col-sm-3 search pull-right">
            <span className="glyphicon glyphicon-search"></span>
            <input type="text" id="search-box" placeholder="Search" />
          </div> */}
          <div className="white-board">
            <button onClick={props.openWhiteBoard}>WhiteBoard</button>
          </div>
        </div>
        <WhiteBoard 
          socket={props.socket} room={props.room} 
          height={document.querySelector('.chat-panel').offsetHeight - document.querySelector('.room-header').offsetHeight-10}
          width={document.querySelector('.chat-panel').offsetWidth-5}
          offsetWidth = {document.querySelector('.namespaces').offsetWidth + document.querySelector('.rooms').offsetWidth}
          offsetHeight = {document.querySelector('.room-header').offsetHeight}
        />
      </div>
    );
  }

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-sm-2 namespaces">
          <h3 className="channel-label">WorkSpaces</h3>
          <ul className="namespace-list">
            {props.nameSpace.map((ns, idx) => {
              return (
                <li
                  key={idx}
                  className={
                    props.activeNS && props.activeNS.name === ns.name
                      ? "active"
                      : ""
                  }
                  onClick={() => props.handleNameSpaceClick(idx)}
                >
                  {ns.name.toUpperCase()}
                </li>
              );
            })}
          </ul>
        </div>

        <div className="col-sm-2 rooms">
          <h3 className="channel-label">Channels</h3>
          <ul className="room-list">{rooms}</ul>
        </div>

        {roomInfo}
      </div>
    </div>
  );
};

export default SideBar;
