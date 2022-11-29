import { useEffect, useState } from 'react';
import axios from 'axios';
import {motion, AnimatePresence} from 'framer-motion'
import { MdClose } from 'react-icons/md';


const inputCountry = document.querySelectorAll('.input-search')[0];


function DisplayResults() {


  const [countries, setCountries] = useState([]);
  const [searchedCountry, setSearchedCountry] = useState('');
  let clicked = false;

    useEffect(() => {

      axios
      .get("https://restcountries.com/v3.1/all")
      .then(response =>  {
        console.log("fetched");
      setCountries(response.data);

      })
      },
      [clicked]);

      function toggleSearch(e) {
        setSearchedCountry(e.target.value)

      }

      function selectCountry(country) {

          //setCountries([countries.name.common[e.target.value]]);
          console.log('clicked')
          console.log(country);
          setSearchedCountry(country.name.common);



      }



      function closeAndBack(){

        clicked = !clicked;
        console.log(clicked,countries);
        setSearchedCountry('');
        inputCountry.value = '';

      }


      let dataFilter = countries.filter( country => country.name["common"].toLowerCase().startsWith(searchedCountry.toLowerCase()));
      console.log(dataFilter);




  return (
    <div className="results" >
        {searchedCountry? <i
        className="close-country" onClick={closeAndBack}><MdClose/></i>: undefined}
        <input className="input-search" value={searchedCountry} onChange={toggleSearch}placeholder="e.g. Uruguay" autoFocus/>
        <div className="results-list">
        <ul>

        {

        /*
        * BEGINNING of the chain of conditional rendering.
        * I chose to use conditional statements instead of switch because is cleaner and visually helps
        * to make changes on the go.
        *
        * */

        searchedCountry.length === 0 && countries.length > 100  ?
          <p className='notification'>Please type a country in the input field.</p>

          :

          /* if data filtered is just one, then display a more detailed panel of information */
          dataFilter.length === 1 ?
                dataFilter.map( country => {

                  return (
                  <motion.li animate={{ opacity: [0, 0.3, 0.5, 0.8, 1] }}   key={country.ccn3}>
                    <h1>{country.name.common} <span> {country.flag}</span></h1>
                    <p><span>{country.name.official}</span><span> | Population: {country.population}</span></p>
                    <img src={country.flags.png} alt={country.name.official+" flag"} />
                  </motion.li>)
                })
                    /* else if the are not countries that match and something was typed in the input*/
                      :
                      searchedCountry.length > 0 && dataFilter.length === 0 ?
                        <p className="notification" >The country you're looking for doesn't exist in our database.</p>


                               :

                               // Slicing to display just 5 items of the full list of matches
                               dataFilter.slice(0,5).map( (country, index) => {

                                    console.log(dataFilter.slice(0,5).length)
                                    return  (
                                      <AnimatePresence key={country.ccn3}>
                                        <motion.li
                                        className='country-item'
                                        onClick={() =>{ return (selectCountry(country)) }}
                                        transition={{duration : 0.2}}
                                        animate={{ opacity: [0, 0.5, 0.3, 1, 0.5, 1] }}
                                        exit={{opacity : [1, 0.8, 0.5, 0.3, 0]}}
                                        style={

                                          // filtering the last item if the remainder notification isn't displayed
                                          // to correct some rect angles in the element.
                                          index === dataFilter.slice(0,5).length-1 && dataFilter.length - 5 < 5  ?
                                        {backgroundColor: "#fafafa", borderRadius: "0px 0px 16px 16px"}
                                        :

                                        (index % 2) ?
                                        {backgroundColor: "#fafafa"}
                                        :
                                        {backgroundColor: "white"}}
                                        key={country.ccn3}>
                                          <span
                                          className='matching-text'>
                                          {country.name.common.slice(0, searchedCountry.length)}
                                          </span>
                                          <span
                                          style={{color: "#8badf1"}}>
                                            {country.name.common.slice(searchedCountry.length)}
                                          </span>
                                          <span className='official-name'>  ({country.name.official})</span>




                                        </motion.li>
                                      </AnimatePresence>
                                      )

                                }



                               )}

                              {

                              // If we've various countries, then, display just five and show the reminder.
                              searchedCountry.length > 0 && dataFilter.length > 1 && (dataFilter.length - 5) > 0 ?
                                <p style={{margin: 0, backgroundColor:  "#fafafa", borderRadius: "0px 0px 16px 16px"}} className='remainder-notification'>and {dataFilter.length - 5} more.</p>
                               :
                               undefined
                               }
        </ul>
        </div>
    </div>

        )


}

export default DisplayResults;
