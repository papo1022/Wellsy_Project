import { useNavigate } from "react-router-dom";

function NoticeItem(props) {

    // 실행할 구문
    let navigate = useNavigate();

    const item = props.item;

    // return 구문
    return (
        <tr onClick={ () => { navigate(`/notice/detail/${ item.noticeId }`); } }>
            <td>{ item.noticeId }</td>

            <td>
                { item.isPinned === 1 ? "고정" : "" }
            </td>

            <td>{ item.title }</td>

            <td>{ item.employeeNo }</td>

            <td>
                { item.createdAt ? item.createdAt.substring(0, 10) : "" }
            </td>

            <td>{ item.viewCount }</td>
        </tr>
    );
}

// 내보내기
export default NoticeItem;