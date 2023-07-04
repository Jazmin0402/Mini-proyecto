import React, {useState, useEffect} from 'react'

const SearchComponent = () => {
  //setear los hooks useState
  const  [ users, setIssues ] = useState([ ])
  const  [ search, setSearch] = useState ("")
  //funncion para traer los datos API
  const URL = 'https://api.github.com/repos/facebook/react/issues'

  const showData = async () => {
    const response = await fetch(URL)
    const data = await response.json()
    setIssues(data)
  }
  //console.log("hola mundo")

  //función de busqueda
  const searcher = (e) => {
    setSearch(e.target.value)
    // console.log(e.target.value)
  }

   //metodo de filtrado
   let results = [ ]
   if(!search)
   {
      // console.log(users);
      results =users
   } else {
     results = users.filter ( (dato) =>
    dato.title.toLowerCase().includes(search.toLocaleLowerCase())
    )
   }

  useEffect( () => {
     showData()
  }, [])
  //rendizamos la vista
  return (
    <div className='container'>
      <div className='row'>
        <br></br>
      </div>
      <div className='row justify-content-end'>
        <div className='col-md-3'>
          <input value={search} onChange={searcher} type='text '  placeholder='Search' className = 'form-control'/>
        </div>
      </div>
      
      <div className='row'>
      <table className='table table-striped table-hover'>
          <thead>
            <tr className='bg-curso text-white'>
                <th>ID</th>
                <th>Titulo</th>
                <th>Usuario</th>
                <th>Etiquetas</th>
            </tr>
          </thead>
          <tbody>
            { results.map ( (issue)  => (
                <tr key= {issue.id}>
                    <td>{issue.id}</td>
                    <td className='text-start'> <a href={issue.html_url}>{issue.title}</a> </td>
                    <td>{issue.user.login}</td>
                    <td className='text-start'>{
                       issue.labels.map((label) => ( 
                       <ul className='text-start' key= {label.id} >
                        <div className='fw-bold'>Nombre:</div> {label.name}
                        <div className='fw-bold'>Descripción:</div>{label.description}
                       </ul> 
                       ))
                    }</td>
                </tr>
            ))}
          </tbody>
      </table>
      </div>
    </div>
  )
}

export default SearchComponent