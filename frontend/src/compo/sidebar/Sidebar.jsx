import SearchInput from "./SearchInput"

function Sidebar() {
  return (
    <div>
        <SearchInput />
        <div className="divider px-3"></div>
        {/* <Conversations />
        <Logout /> */}
    </div>
  )
}

export default Sidebar