import { motion } from "framer-motion"
import MessageSearchBar from "../../components/common/MessageSearchBar";
import MessageItem from "../../components/items/MessageItem";
import MessageCSS from "../../css/Message.module.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import { callLikedMsgListAPI } from "../../apis/MessageAPICalls";

function LikeMsgBox ({setWhichPage, stateChangeHandler}) {

    const dispatch = useDispatch();
    const { likedMsg, likeMsg, removeMsg, likedMsgSearch } = useSelector(state => state.MessageReducer);
    const [checkedIdList, setCheckedIdList] = useState([]);

    useEffect(
        () => {
            /* 중요 쪽지함 조회 API 호출 */
            dispatch(callLikedMsgListAPI());

            if(removeMsg?.status === 200) {
                toast.success("선택하신 쪽지가 삭제되었습니다 :)");
            }

        },[likeMsg, removeMsg]
    );

    /* 각 checkbox의 상태가 변경될 때 호출되는 이벤트 함수 */
    const checkboxChangeHandler = (e) => {
        const id = e.target.id;             // 해당 메시지의 id
        const isChecked = e.target.checked; // true/false

        if (isChecked) {
            setCheckedIdList([...checkedIdList, id]);
        } else { // 체크박스를 해제한 경우(false일 경우) checkedIdList에서 해당 id 제거하여 필터링한 후 다시 set에 저장
            setCheckedIdList(checkedIdList.filter((checkedId) => checkedId !== id));
        }

        console.log("checkedIdList : {}", checkedIdList);
    }

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ ease: "easeOut", duration: 0.5 }}>
            <MessageSearchBar msgBoxType={ 'liked' }/>
            <div className={ MessageCSS.dummyBox }/>
            <div className={ MessageCSS.msgListBox }>
                { (likedMsg || []).concat(likedMsgSearch || []).map(message => (
                    <MessageItem 
                        key={ message.msgCode }
                        message={ message }
                        setWhichPage={setWhichPage} 
                        stateChangeHandler={stateChangeHandler}
                        isChecked={ checkedIdList.includes(String(message.msgCode)) }
                        checkboxChangeHandler={checkboxChangeHandler}
                        checkedIdList={checkedIdList}
                        setCheckedIdList={setCheckedIdList}
                    />
                ))
                }
            </div>
        </motion.div>
    );
}

export default LikeMsgBox;