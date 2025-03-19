import React, { useEffect, useRef, useState } from "react";
import moment from "moment";
import {
  ButtonPrimary,
  ButtonSecondary,
} from "./messegers/components/ButtonUI";
import ChatBody from "./messegers/components/ChatBody";

export default function MessegersUI() {
  const chatArr = [
    { id: 1, message: "Hi", from: "Febry", date: "2024-02-22 10:30:00" },
    { id: 2, message: "Iya", from: "Isnan", date: "2024-02-22 10:35:00" },
    {
      id: 3,
      message: "Apakah itu Micro-Frontend ?",
      from: "Febry",
      date: "2024-02-22 10:50:00",
    },
    { id: 4, message: "Kaga tau", from: "Isnan", date: "2024-02-22 10:52:00" },
    { id: 5, message: "Apaan dah", from: "Isnan", date: "2024-02-22 10:52:00" },
    {
      id: 6,
      message: "Arsitektur pada bagian FrontEnd aplikasi...",
      from: "Febry",
      date: "2024-02-22 11:00:00",
    },
    { id: 7, message: "Bijiiii", from: "Isnan", date: "2024-02-22 12:12:00" },
  ];

  const [myChat, setMychat] = useState(
    chatArr.sort((a, b) => new Date(a.date) - new Date(b.date))
  );
  const [writeChat, setWriteChat] = useState("");

  const endOfMessageRef = useRef(null);
  const scrollToBottom = () => {
    endOfMessageRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handlerSendChat = (e) => {
    e.preventDefault();

    const objChat = {
      id: myChat.length + 1,
      message: writeChat,
      from: "Febry",
      date: moment().format("YYYY-MM-DD HH:mm:ss"),
    };
    const updatedChat = [...myChat, objChat].sort(
      (a, b) => new Date(a.date) - new Date(b.date)
    );
    setMychat(updatedChat);
    setWriteChat("");
  };

  useEffect(() => {
    scrollToBottom();
  }, [myChat]);

  const groupedChats = myChat.reduce((acc, chat) => {
    const dateKey = moment(chat.date).format("YYYY-MM-DD");
    if (!acc[dateKey]) acc[dateKey] = [];
    acc[dateKey].push(chat);
    return acc;
  }, {});

  return (
    <div className="card">
      <div className="card-header">
        <h3 className="card-title align-items-start flex-column">
          <span className="fw-bold mb-2">Chats</span>
        </h3>
      </div>
      <div className="card-toolbar">
        <ButtonSecondary
          items={{ title: "Create new chat", btn_class: "btn-icon btn-clear" }}
        >
          <i className="bi bi-pencil-square"></i>
        </ButtonSecondary>
      </div>
      <div className="card-body">
        <div
          className="chat-message px-2 bg-light-primary"
          style={StylesMesseger.chatBox}
        >
          {Object.keys(groupedChats).map((date) => (
            <div key={date}>
              <div className="d-flex justify-content-center my-2">
                <div
                  className="p-1 rounded border"
                  style={{ padding: "4px 8px" }}
                >
                  {moment(date).isSame(moment(), "day")
                    ? "Today"
                    : moment(date).format("DD MMM YYYY")}
                </div>
              </div>
              <ChatBody data={groupedChats[date]} />
            </div>
          ))}
          <div ref={endOfMessageRef} />
        </div>
        <div className="chat-send bg-light p-3">
          <form method="post" autoComplete="off" onSubmit={handlerSendChat}>
            <div className="d-flex justify-content-between align-items-center">
              <input
                type="text"
                className="form-control me-2"
                autoFocus
                value={writeChat}
                onChange={(e) => setWriteChat(e.target.value)}
              />
              <ButtonPrimary
                items={{
                  title: "Send",
                  btn_class: "btn-icon btn-primary",
                  type: "submit",
                }}
              >
                <i className="bi bi-send"></i>
              </ButtonPrimary>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

const StylesMesseger = {
  chatBox: {
    minHeight: "200px",
    maxHeight: "45vh",
    overflowY: "auto",
  },
};
