import "./UsersPaginator.scss";
import arrow from "../../../../../svg/arrow.svg";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setUsersListAction } from "../../../../../redux/actionCreators/setUsersListAction";
import { disablePaginateAction } from "../../../../../redux/actionCreators/disablePaginateAction";
import store from "../../../../../redux/store";

const UsersPaginator = () => {
  const ableToPaginate = useSelector((state) => state.ableToPaginate);
  const dispatch = useDispatch();
  const usersList = useSelector((state) => state.usersList);

  const fetchData = async () => {
    await axios
      .get("https://reqres.in/api/users?page=2")
      .then((res) => {
        res.data.page === res.data.total_pages &&
          dispatch(disablePaginateAction());
        dispatch(setUsersListAction([...usersList, ...res.data.data]));
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <button
      id="paginator"
      disabled={!ableToPaginate}
      style={!ableToPaginate ? { pointerEvents: "none" } : {}}
      onClick={fetchData}
    >
      Показать еще
      <img src={arrow} alt="" />
    </button>
  );
};

export default UsersPaginator;
