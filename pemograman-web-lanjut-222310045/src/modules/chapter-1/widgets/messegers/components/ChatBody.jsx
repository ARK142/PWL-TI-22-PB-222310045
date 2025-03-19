import React from "react";
import moment from "moment";

const ChatBubleItem = ({ data, itsme }) => {
  const isSender = data.from === itsme;
  const bubbleStyle = isSender
    ? styleChatItems.chatBubleSender
    : styleChatItems.chatBubleReceiver;

  return (
    <div className="chat text-white rounded my-2 p-2" style={bubbleStyle}>
      <span className="me-3">{data.message}</span>
      <span className="chat-date" style={{ fontSize: "11px" }}>
        {moment(data.date).format("HH:mm")}
      </span>
    </div>
  );
};

export default function ChatBody({ data }) {
  const itsme = "Febry";
  const listData = data;
  return (
    <div className="chat-items">
      {listData.map((v, index) => (
        <div
          key={index}
          className="chat-item"
          style={styleChatItems.chatBubleItems}
        >
          <ChatBubleItem data={v} itsme={itsme} />
        </div>
      ))}
    </div>
  );
}

const styleChatItems = {
  chatBubleItems: {
    display: "flex",
    flexDirection: "column",
  },
  chatBubleSender: {
    textAlign: "right",
    backgroundColor: "#a198a7",
    alignSelf: "flex-end",
  },
  chatBubleReceiver: {
    backgroundColor: "#a83aef",
    alignSelf: "flex-start",
  },
};
