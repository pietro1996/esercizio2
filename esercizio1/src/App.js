import React, {useEffect, useState} from 'react';
import iconafrutta from "./images/iconafrutta.png";
import "./App.css";
const API_HOST = "http://localhost:3000";
const INVENTORY_API_URL = `${API_HOST}/frutti`;

<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>

function App() {
    const [data, setData] = useState([]);

    const [todos, setTodos] = React.useState([]);  
    const [isHidden,setHiddden] = React.useState(true);
    const [buttonAggiungiHidden,setButtonAggiungiHidden] = React.useState(false);
    const [buttonChiudiHidden,setButtonChiudiHidden] = React.useState(true);

    const [todo, setTodo] = React.useState("");  
    const [todo1, setTodo1] = React.useState("");
    const [todo2, setTodo2] = React.useState("");
    

    const fetchInventory = () => {
        fetch(`${INVENTORY_API_URL}`)
            .then(res => res.json())
            .then(json => setData(json));
    }

    useEffect(() => {
        fetchInventory();
    }, []);

    React.useEffect(() => {
      const data = localStorage.getItem("todos");
      const loadedTodos = JSON.parse(data);
      if (loadedTodos) {
        setTodos(loadedTodos);
      }
    }, []);
  
    React.useEffect(() => {
      const data = JSON.stringify(todos);
      localStorage.setItem("todos", data);
    }, [todos]);
  
    function handleSubmit(e) {
      e.preventDefault();
  
      const newTodo = {
        id: new Date().getTime(),
        imageSrc: iconafrutta,
        name:todo,
        qta:todo1,
        prezzo:todo2,
        
      };
      setData([...data].concat(newTodo));
      
      setTodo("");
      setTodo1("");
      setTodo2("");
      
    }
  
    function deleteTodo(id) {
      let updatedTodos = [...data].filter((todo) => todo.id !== id);
      setData(updatedTodos);
    }
  
  
    
    function isHiddenFunction(){
      setHiddden(false);
      setButtonAggiungiHidden(true);
      setButtonChiudiHidden(false);
    }

    function isViewableFunction(){
      setHiddden(true);
      setButtonAggiungiHidden(false);
      setButtonChiudiHidden(true);
    }
  
    function finishFunction(quantita){
  
      if (quantita>0){
        return "Disponibile"
      }
      else{
  
        return "Esaurito"
      }
  
    }
    function floatFunction(prezzo){

      if(prezzo==parseInt(prezzo)){
        return prezzo+",00"
      }
      else{
        let stringa = prezzo.toString().replace(".",",")
        return stringa
      }

    }
    

    return (
      <div  id="image"> 
      
            
      

        <div  id="todo-list">     
          <h1 ><font color="#6A8592">My Fruit Shop</font></h1>
          
          <button  id="buttonAggiungi" hidden={buttonAggiungiHidden}  onClick={isHiddenFunction} ><font color="#FFFFFF">Aggiungi</font>  </button>
           
        
          <div hidden={isHidden}>                 
              <button id="buttonChiudi" hidden={buttonChiudiHidden} onClick={isViewableFunction}><font color="#F3CA1C">Chiudi</font></button>
              <form id="formShop"  onSubmit={handleSubmit}>
                <img id="imgFrutta"  src={iconafrutta} width="60" />
            
                <input id="input1"
                  size="10"
                  type="text"
                  autoComplete="off"
                  placeholder="   Descrizione prodotto"
                  onChange={(e) => setTodo(e.target.value)}
                  value={todo}
                  required
                />

                
                <input id="input2"
                size="10"
                type="number"
                placeholder="Quantità"
                min="0"
                onChange={(e) => setTodo1(e.target.value)}
                value={todo1}
                required
                /> 

                <input id="input3"
                  type="number"
                  placeholder="Prezzo"
                  min="0"
                  step="0.01"
                  onChange={(e) => setTodo2(e.target.value)}
                  value={todo2}
                  required
                /> 
              
              

              <button id="buttonConferma" type="submit"><font color="#FFFFFF">Conferma</font></button>
              

              </form>

           </div>       
          
          <div  width="1000px" id="container">
            
            <table   width="1200px"  border="0" align="center" cellPadding="0" cellSpacing="0" >
                <thead >
                  <tr >
                      <th width="40" bgcolor="#CED9DE"></th>
                      <th bgcolor="#CED9DE" width="200" height="50" align="left" width="200" height="30"><font color="#8A9DA6">Descrizione Prodotto</font></th>
                      <th bgcolor="#CED9DE" width="200" height="50"><font color="#8A9DA6">Qta</font></th>
                      <th bgcolor="#CED9DE" width="200" height="50"><font color="#8A9DA6">Prezzo</font></th>
                      <th bgcolor="#CED9DE" width="200" height="50"><font color="#8A9DA6">Stato</font></th>
                      <th bgcolor="#CED9DE" width="200" height="50" align="center"><font color="#8A9DA6">Azioni</font></th>
                  </tr>
                </thead>
                <tbody>

                
                      {
                              data.map((item) => (
                                  <tr id="effettoZoom" key={item.id}>
                                      <td  width="200" height="100" align="center"><img width="74px" height="74px" src={item.imageSrc}/></td>
                                      <td width="600" height="100">{item.name}</td>
                                      <td width="100" height="100" align="center">{item.qta} pz</td>
                                      <td width="100" height="100" align="center">{floatFunction(item.prezzo)} €</td>
                                      <td width="100" height="100" align="center"><button className={finishFunction(item.qta)}><font color="#FFFFFF">{finishFunction(item.qta)}</font></button></td>
                                      <td width="100" height="100" align="center"><button  id="buttonDelete"  onClick={() => deleteTodo(item.id)}></button></td>                                      
                                      <td/>
                                  </tr>
                              ))
                          }
                </tbody>
            </table>
          </div>

        </div>
    </div> 
    );
}

export default App;
