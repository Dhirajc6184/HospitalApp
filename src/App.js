
import './App.css';
import { useState, useEffect } from 'react'

function App() {

  const [data, setData] = useState([]);
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [price, setPrice] = useState("");
  const [isUpdate, setIsUpdate] = useState(false)
  const [id, setId] = useState(0)


  useEffect(() => {
    setData(data)
  }, [])

  const handleEdit = (id) => {
    const ch=id
    if (id > 0) {
      if (window.confirm("Are you sure to edit "+ch+"?")) {
        const editData = data.filter(item => item.id === id);
        if (editData !== undefined) {
          setIsUpdate(true)
          setId(id)
          setName(editData[0].Name)
          setDesc(editData[0].Desc)
          setPrice(editData[0].price)
        }
      }

    }
  }

  const handleDelete = (id) => {
    if (id > 0) {
      if (window.confirm("Are you sure to delete this ?")) {
        const deletedData = data.filter(item => item.id !== id);
        setData(deletedData);
      }
    }
  }

  const handleUpdate = () => {
    const index = data.map((item) => {
      return item.id
    }).indexOf(id)

    const dt = [...data];
    dt[index].Name = name
    dt[index].Desc = desc
    dt[index].Price = price

    setData(dt);
    handleCancel();

  }
  const handleSave = (e) => {
    e.preventDefault();
    const currData = [...data];
    const newData = {
      id: data.length + 1,
      Name: name,
      Desc: desc,
      price: price
    }
    if(newData["Name"]!=="" && newData["Desc"]!=="" && newData["price"]!=="" ){
      
      console.log(typeof(newData["price"]))
      currData.push(newData)
      setData(currData);
      handleCancel();

    }
    else{
      alert("All the fields are required to submit the form");
    }



  }

  const handleCancel = () => {
    setIsUpdate(false)
    setName("")
    setDesc("")
    setPrice("")
  }
  return (
    <>

      <nav className="navbar navbar-expand-lg navbar-dark bg-dark" id='nav'>
        <div className="container-fluid">
          <a className="navbar-brand" href="#nav">ServiceManager</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link active " aria-current="page" href="#nav" aria-disabled="true">Home</a>
              </li>

            </ul>

          </div>
        </div>
      </nav>



      <div className="container mt-5 hover">
        <center><h2 className='m-4'><em> Add Data </em> </h2>
          <input type="text" className='form-control  m-2' placeholder='name' value={name} onChange={(e) => setName(e.target.value)} />
          <input type="text" className='form-control  m-2' placeholder='Description' value={desc} onChange={(e) => setDesc(e.target.value)} />
          <input type="number" className='form-control  m-2' placeholder='Price' value={price} onChange={(e) => setPrice(e.target.value)} />
          <div>
            {
              !isUpdate ?
                <button className='btn btn-success mt-3 mx-2' onClick={(e) => handleSave(e)}>Save</button>
                :
                <button className='btn btn-success mt-3 mx-2' onClick={handleUpdate}>Update</button>
            }
            <button className='btn btn-warning mt-3 mx-2' onClick={handleCancel}>Cancel</button>
          </div>


          <div className="center">
            <hr />
          </div>
        </center>

      </div>


      <div className="container mt-5">

        <center><b><h3><em>Your Database</em></h3></b>

          <table className="table table-hover table-info">
            <thead>
              <tr className='table-info'>
                <th scope="col">#</th>
                <th scope="col">id</th>
                <th scope="col">Name</th>
                <th scope="col">Desc</th>
                <th scope="col">Price</th>
                <th scope="col">User actions</th>
              </tr>
            </thead>
            <tbody>
              {
                data.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{item.id}</td>
                      <td>{item.Name}</td>
                      <td>{item.Desc}</td>
                      <td>${item.price}</td>
                      <td> <button className='btn btn-success mx-2' onClick={() => handleEdit(item.id)}>Edit</button>
                        <button className='btn btn-danger' onClick={() => handleDelete(item.id)}>Delete</button></td>
                    </tr>
                  )
                })
              }
            </tbody>
          </table>
        </center>
      </div>






    </>
  );
}

export default App;
