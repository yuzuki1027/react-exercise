import { useEffect ,useState} from "react";
import {fetchBrewpub} from "./api";

function Header() {
  return (
    <header>
    <h1 className="teal-text text-lighten-3">let's drink beer</h1>
  </header>
  );
}
function Card(props) {
  const restaurant=data.name;
  const city=data.city;
  const website=data.website_url;
  const imageURL = "https://ayaemo.skr.jp/images/material/shop/800x600/restaurant01_day%20by%20heatheronhertravels.jpg";
  return (
    <div className="card hoverable">
    <div className="card-image">
      <img src={imageURL}></img>
    </div>
    <div className="card-content">
      <h3>{city}</h3>
    </div>
    <div className="card-action">
    <h3><a href={website} >{restaurant}</a></h3>
    </div>
  </div>
  );
}

function Loading() {
  return (
    <p>Please wait...</p>
  );

}

function Gallery(props) {
  const  {data} =props;
  if (data== null) {
    return <Loading />;
  }
    return (
    <div className="columns is-vcentered is-multiline">
     {data.map((datakey) => {
        return (
          <div key={datakey} >
            <Card data={datakey} />
          </div>
        );
      })}
      </div>
  );
}

function Form(props) {
  document.addEventListener('DOMContentLoaded', function() {
  var elems = document.querySelectorAll('form');
  });
  function handleSubmit(event) {
    event.preventDefault();
    const obj = document.getElementById('select');
    const idx = obj.selectedIndex;
    const state  = obj.options[idx].text;
    props.onFormSubmit(state);
  }
  return (
    <div className= "input-field col s12">
    <form onSubmit={handleSubmit}>
    <select id = "select" name="state" defaultValue="ohio"  >
      Where are you going today?
      <option value="Ohio">Ohio</option>
      <option value="New_York">New_York</option>
      <option value="Mexico">Mexico</option>
    </select>
    <label>Please select state...</label>
      <div className="control">
              <button type="submit" className="button is-dark" >
                Reload
              </button>
      </div>
      </form>
  </div>

  );
}
function Main() {
  const [data ,setData] = useState(null);
   useEffect(() => {
    fetchBrewpub("Ohio").then((data) => {
      setData(data);
    });
  }, []);

  function reloadData(state) {
    fetchBrewpub(state).then((data) => {
     setData(data);
    });
  } 
  return (
    <main>
     <section className="section">
    <div className="container">
      <Form onFormSubmit={reloadData} />
  </div>
    </section>
      <section>
        <div className="container">
          <Gallery data={data}/>
        </div>
      </section>
    </main>
  );
}

function Footer() {
  return (
    <footer>
    <p>their photos are retrieved from <a href="https://ayaemo.skr.jp/">あやえも研究所</a></p>
    
    <a href="https://www.openbrewerydb.org/">Donate to Open Brewery DB</a>
    <p>日本大学文理学部情報科学科Webプログラミングの演習課題 5420075 高橋優月</p>
  </footer>
  );
}
function App() {
 
  return (
    <div>
      <Header />
      <Main />
      <Footer />
    </div>
  );
}

export default App;