import { useNavigate } from "react-router-dom";

function NoticeItem(props) {

    // 실행할 구문
    let navigate = useNavigate();

    const item = props.item;

    // return 구문
    return (

        <tr
            className="notice-table-row"
            onClick={ () => {
                navigate(`/notice/detail/${ item.noticeId }`);
            }}
        >

            <td>
                { item.noticeId }
            </td>

            <td>

                {
                    item.isPinned === 1
                    ?
                    <span className="notice-pin">
                        고정
                    </span>
                    :
                    "-"
                }

            </td>

            <td className="notice-title-cell">
                { item.title }
            </td>

            <td>
                { item.employeeNo }
            </td>

            <td>

                {
                    item.createdAt
                    ?
                    item.createdAt.substring(0, 10)
                    :
                    "-"
                }

            </td>

            <td>
                { item.viewCount }
            </td>

        </tr>

    );
}

// 내보내기
export default NoticeItem;