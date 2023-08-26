import { useEffect, useState, useRef } from 'react'
import './App.css'
import Searchbar from './componenets/Searchbar'
import Context from './Context'
import "./Styles.sass"
import { FaRegPlayCircle } from "react-icons/fa";

function App() {
  const [word, setWord] = useState(null)
  const [data, setData] = useState(null)
  const [play, setPlay] = useState(false)
  const [adio, setAdio] = useState([])

  const mylink = document.querySelector("#mylink")
  const player = document.querySelector("#myaudio")

  const audioRef = useRef(null);
  
  useEffect(()=> {
    fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/dictionary`)
    .then((response) => response.json())
    .then((json) => {
      console.log(json)
      setAdio(json);
    });
  },[])
  

  useEffect(()=>{
    if(word){
      fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
        .then((response) => response.json())
        .then((json) => {
          console.log(json)
          setData(json);
          mylink.href = data[0].license.url
        });
    }
  }, [word])

  const Playing = () => {
    if (play === false) {
      audioRef.current.play(); 
      setPlay(true); 
    } else {
      audioRef.current.pause(); 
      setPlay(false); 
    }
  };

  return (
    <Context.Provider value = {setWord}>
      <div className='dictionary'>
        <Searchbar/>
        {data ? (
          <>
            <div className='dictionary_start'>
              <div className='real'>
                <div className='first_part'>
                  <span className='name_dets'>
                    <span className='word'>{word}</span>
                    <span className='soun'>{data[0].phonetic}</span>
                  </span>
                  <span className='audio'>
                    <FaRegPlayCircle className='audio' onClick={Playing}/>
                    {
                      data[0].phonetics.map((phn, index) => (
                        phn.audio ? (
                          <audio key={index} preload='auto' ref={audioRef} src={phn.audio}>
                            Your browser does not support the audio tag.
                          </audio>
                        ): (
                          <audio key={index} preload='auto' ref={audioRef} src={data[0].phonetics[0].audio}>
                            Your browser does not support the audio tag.
                          </audio>
                        )
                      ))
                    }
                  </span>
                </div>
                {
                  data[0].meanings ? (
                    data[0].meanings.map((dt, index) => (
                      <div key={index} className='second_part'>
                        <div className='word_dets'>
                          <span className='noun'>{dt.partOfSpeech}</span>
                          <hr/>
                        </div>
                        <div className='meaning_div'>

                          <span className='none'>Meaning</span>
                          <ul className='meaning'>
                            {
                              dt.definitions ? (
                                dt.definitions.map((mn, index) => (
                                  <li key={index} className='mean'>{mn.definition}</li>
                                ))
                              ) : (<span></span>)
                            }
                          </ul>
                        </div>
                        <div className='synonym'>
                          <span className='none'>Synonyms</span>
                          <ul className='list'>
                            {
                              dt.synonyms ? (
                                dt.synonyms.map((sn, index) => (
                                  <li key={index} className='mean'>{sn}</li>
                                ))
                              ) : (<span></span>)
                            }
                          </ul>
                        </div>
                        <div className='synonym'>
                          <span className='none'>Antonyms</span>
                          <ul className='list'>
                            {
                              dt.antonyms ? (
                                dt.antonyms.map((sn, index) => (
                                  <li key={index} className='mean'>{sn}</li>
                                ))
                              ) : (<span></span>)
                            }
                          </ul>
                        </div>
                      </div>
                    ))) : (<span>it has no meaning</span>)
                }
                
              </div>
              {data.length > 1 ? (
                data.slice(1).map((dt, index) => (
                  <div key={index} className='secondss'>
                    {/* Mapping over meanings */}
                    {dt.meanings ? (
                      dt.meanings.map((meaning, meaningIndex) => (
                        <div key={meaningIndex} className='second_part'>
                          <div className='word_dets'>
                            <span className='noun'>{meaning.partOfSpeech}</span>
                            <hr/>
                          </div>
                          <div className='meaning_div'>
                            <span className='none'>Meaning</span>
                            <ul className='meaning'>
                              {meaning.definitions ? (
                                meaning.definitions.map((mn, defIndex) => (
                                  <li key={defIndex} className='mean'>{mn.definition}</li>
                                ))
                              ) : (
                                <span></span>
                              )}
                            </ul>
                          </div>
                          <div className='synonym'>
                            <span className='none'>Synonyms</span>
                            <ul className='list'>
                              {meaning.synonyms ? (
                                meaning.synonyms.map((syn, synIndex) => (
                                  <li key={synIndex} className='mean'>{syn}</li>
                                ))
                              ) : (
                                <span></span>
                              )}
                            </ul>
                          </div>
                          <div className='synonym'>
                            <span className='none'>Antonyms</span>
                            <ul className='list'>
                              {meaning.antonyms ? (
                                meaning.antonyms.map((ant, antIndex) => (
                                  <li key={antIndex} className='mean'>{ant}</li>
                                ))
                              ) : (
                                <span></span>
                              )}
                            </ul>
                          </div>
                        </div>
                      ))
                    ) : (
                      <span>it has no meaning</span>
                    )}
                  </div>
                ))
              ) : (
                <span></span>
              )}


              <div className='source'>
                <hr/>
                <div>
                  Source: <a href={data[0].license.url} className='url' id='mylink'>{data[0].license.url}</a>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className='dic_div'>
            <span className='dic_word'>dictionary.</span>
            <span className='name_dets'>
              {
                adio && adio[0] ? (
                  <>
                    <span className='soun'>{adio[0].phonetic}</span>
                    <div className='second_part'>
                      <div className='word_dets'>
                        <span className='noun'>{adio[0].meanings[0].partOfSpeech}</span>
                        <hr/>
                      </div>
                      <div className='meaning_div'>
                        <span className='none'>Meaning</span>
                        <ul className='meaning'>
                          <li  className='mean'>{adio[0].meanings[0].definitions[0].definition}</li>
                        </ul>
                      </div>
                    </div>
                  </>
                ):(<span></span>)
              }
              
            </span>
          </div>
          )
          
        }
      </div>
    </Context.Provider>
  )
}

export default App
