import React, { use, useState } from "react";
import "./App.css";


let usersList = [
{namesurname: 'Алексей Иванов', role: 'admin', stat: true}, 
{namesurname: 'Мария Смирнова', role: 'user', stat: true},
{namesurname: 'Иван Петров', role: 'user', stat: false},
{namesurname: 'Елена Соколова', role: 'admin', stat: false},
{namesurname: 'Дмитрий Волков', role: 'user', stat: true},
]


function MainText() {
  return (
    <div className='main__text'>
    <h1>Панель управления пользователями</h1>
    </div>
  );
}

function InputThings(
  {
    searchInput, setSearchInput,
    isActive, setIsActive,
    selectedOption, setSelectedOption
  }
) {

  return (
    <form className="input">
      <InputSearch searchInput={searchInput} setSearchInput={setSearchInput} isActive={isActive} setIsActive={setIsActive}/>
      <InputSort isActive={isActive} setIsActive={setIsActive}
       selectedOption={selectedOption} setSelectedOption={setSelectedOption} />
    </form>
  )
}

function InputSearch({searchInput, setSearchInput}) {
  
  return (
    <input type="text" value={searchInput} onChange={(e) => setSearchInput(e.target.value)} className='search'/>
  )
}

function InputSort({setIsActive, selectedOption, setSelectedOption}) {
  
  return (
    <div className='sort'>
      <label className='sort__checkbox'>
            <input type="checkbox"
            value={null} 
            onChange={(e) => setIsActive(e.target.checked)}/>
            Только активные
      </label>
      <select value={selectedOption} onChange={(e) => setSelectedOption(e.target.value)}
          className='sort__list'>
          <option value="all">Все роли</option>
          <option value="admin">Админ</option>
          <option value="user">Пользователь</option>
      </select>
    </div>
  )
}

function TableRow({mass}) {

  let fullName = mass.namesurname
  let role = mass.role
  let status = mass.stat

  return(
    <tr>
      <td>
        {fullName}
      </td>
      <td>
        {role == 'user' ? 'Пользователь' : 'Администратор'}
      </td>
      <td style={status ? { color: 'green' } : { color: 'red' } }>
      {status ? 'Активен' : 'Заблокирован'}
      </td>
    </tr>
  )
}


function UserList({usersList, searchInput, isActive, selectedOption}) {

  let rows = []

  usersList.forEach(element => {
    if (element.namesurname.toLowerCase().indexOf(searchInput.toLowerCase()) === -1) {
      return
    }

    if (!element.stat && isActive) {
      return
    }

    if ((selectedOption != 'all') && (element.role != selectedOption)) {
      return
    }




    rows.push(<TableRow mass={element}/>)
  })

  return (
    <div className='table'>
      <table>
        <thead>
          <tr className='table__lines'>
            <th>Имя</th>
            <th>Роль</th>
            <th>Статус</th>
          </tr>
        </thead>

        <tbody className="table__body">
          {rows.length > 0 ? rows : 'Пользователи не найдены...'}
        </tbody>
      </table>
    </div>
  )
}

function AdminPanel() {

  let [searchInput, setSearchInput] = useState('')  
  let [isActive, setIsActive] = useState(false)
  let [selectedOption, setSelectedOption] = useState('all')

  return (
    <>
    <div className="container">
      <MainText/>
      <InputThings 
      searchInput={searchInput}
      setSearchInput = {setSearchInput}
      isActive = {isActive}
      setIsActive = {setIsActive}
      selectedOption = {selectedOption}
      setSelectedOption = {setSelectedOption}/>
      <UserList usersList={usersList} searchInput={searchInput} isActive={isActive} selectedOption={selectedOption}/>
    </div>
    </>
  );
}

export default function App() {
  return <AdminPanel/>;
}
