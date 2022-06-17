import React, { useEffect, useState } from "react";
import Nweet from "../components/Nweet";
import { dbService, storageService } from "../fbase";
import { useNavigate } from "react-router-dom";
import Itemlist from "./Itemlist";

const Home = ({ userObj }) => {
    const [lists, setLists] = useState([]);
    const [joinlists, setJoinlists] = useState([]);
    useEffect(() => {
        dbService.collection("startlist").onSnapshot((snapshot) => {
            const listArray = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setLists(listArray);
        });
    }, []);
    useEffect(() => {
        dbService.collection("joinlist").onSnapshot((snapshot) => {
            const listArray = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setJoinlists(listArray);
        });
    }, []);
    return (
        <div className="container">
            <div style={{ marginTop: 30 }}>
                {lists.map((list) => (
                    <Nweet
                        key={list.id}
                        userObj={userObj}
                        listObj={list}
                        isOwner={list.creatorId === userObj.uid}
                    />
                ))}
            </div>
        </div>
    );
};
export default Home;