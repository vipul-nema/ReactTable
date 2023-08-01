import "./styles.css";

import { createRef, useEffect, useState } from "react";

function Row({ firstName, lastName, gender, idValue, country, handleDelete }) {
  return (
    <tr>
      <td> {firstName}</td>
      <td> {lastName}</td>
      <td> {gender}</td>
      <td> {country}</td>

      <td>
        {" "}
        <button
          onClick={() => {
            // console.log("onClick", idValue);
            handleDelete(idValue);
          }}
        >
          Delete{" "}
        </button>
      </td>
    </tr>
  );
}

let apiData = null;

export default function App() {
  const [data, setData] = useState([]);
  const [searchKey, setSearchKey] = useState("");

  const searchInputRef = createRef();

  const [restoreCount, setRestoreCount] = useState(0);

  useEffect(() => {
    if (!apiData) {
      let url = "https://randomuser.me/api/?results=20";
      fetch(url)
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          // console.log(data.results);
          apiData = data.results;
          setData(data.results);
        });
    } else {
      setData(apiData);
    }
  }, [restoreCount]);

  function handleDelete(idValue) {
    console.log("handleDelete", idValue);
    let newData = data.filter((item, index) => {
      let { id } = item;

      if (item.email !== idValue) {
        return true;
      } else {
        return false;
      }
    });

    setData(newData);
  }

  function handleRestore() {
    setRestoreCount(restoreCount + 1);
  }

  function handleSearch() {
    const searchKey = searchInputRef.current.value;
    // console.log("searchKey", searchKey);
    setSearchKey(searchKey);
  }

  const tabelData = data.filter((item) => {
    let { name } = item;
    let { first } = name;

    if (!searchKey) {
      return true;
    }
    if (first.toLowerCase().includes(searchKey.toLocaleLowerCase())) {
      return true;
    } else {
      return false;
    }
  });

  return (
    <div className="App">
      <input type="text" onChange={handleSearch} ref={searchInputRef} />

      <button
        onClick={() => {
          handleRestore();
        }}
      >
        Restore{" "}
      </button>
      {/* <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2> */}
      {/* <Heading/> */}
      <table>
        <tr>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Gender</th>
          <th>Country</th>
        </tr>

        {tabelData.length > 0 &&
          tabelData.map((item, index) => {
            let { name, gender, email, location } = item;
            let { first, last } = name;
            let { country } = location;
            // console.log("id", id.value, item);
            return (
              <Row
                idValue={email}
                key={email}
                firstName={first}
                lastName={last}
                gender={gender}
                country={country}
                handleDelete={handleDelete}
              />
            );
          })}
        {/* <ROW/> */}
      </table>
    </div>
  );
}

// api -
// table

// Restore button

// Search - firstName

// firstName
// lastName
// gender
// cuntry
// delete - delete the row,
