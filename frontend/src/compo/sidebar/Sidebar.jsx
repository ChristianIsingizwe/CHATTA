import SearchInput from "./SearchInput";
import Conversations from "./Conversations";

function Sidebar() {
  return (
    <div>
      <SearchInput />
      <div className="divider px-3"></div>
      <Conversations />
      {/* <Conversations />
        <Logout /> */}
    </div>
  );
}

export default Sidebar;
