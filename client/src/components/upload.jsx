
import { useEffect, useState } from 'react'
import axios from 'axios';
import FormData from 'form-data';

export default function Upload() {

    const [file, setFile] = useState()
    const [Title, setTitle] = useState()
    const [topics,setTopics] = useState([])
    const [content,setContent] = useState()
    const [selectedTopics,setSelectedTopics] = useState([])

    let author = localStorage.getItem('id')


    function handleChange(event) {
  
      setFile(event.target.files[0])
  
    }
  
    function handleSubmit(event) {
      event.preventDefault()
      
      const formData = new FormData();
      
      const url = 'http://localhost:4000/blogs/create';
      
      if(file){
        formData.append('file', file);  
        formData.append('fileName', file.name);
      }else{
        formData.append('file', null);
      }
  
      formData.append('title', Title);
      
      formData.append('content',content);

      formData.append('author',localStorage.getItem("id"));

      selectedTopics.forEach(topic => formData.append('topics', topic))
  
      const config = {
        withCredentials: true,
        headers: {
  
          'content-type': 'multipart/form-data',
  
        },
  
      };
      console.log(formData)
      axios.post(url, formData, config).then((response) => {
  
        console.log(response.data);
        if (response.status == 200)
        {
          alert("Blog uploaded successfully");
        }
        
  
      });
  
    }

  function getTopics() {
    const url = 'http://localhost:4000/topic/All';
    axios.get(url).then((response) => {
      console.log(response.data);
      
      setTopics(response.data)
    });
  }

  function handleTopicChange(name) {
    console.log(name)
    if( selectedTopics.indexOf(name) === -1){
      setSelectedTopics([...selectedTopics,name])
    }else{
      setSelectedTopics(selectedTopics.filter((topic)=>topic!==name))
    }
  }

  useEffect(() => {
    getTopics()
  },[])

  useEffect(()=>{
    console.log(selectedTopics)
  },[selectedTopics]) 
  
    return (
    <div className='flex flex-row items-center justify-center bg-slate-100 dark:bg-slate-900 w-full h-screen'>
  
          <form onSubmit={handleSubmit} className="flex flex-col w-132 h-128 justify-evenly rounded-lg bg-white dark:bg-slate-700 border-solid border-2 border-indigo-500 dark:border-slate-200">
  
            <h1 className='text-indigo-600 dark:text-white text-3xl mx-auto '>Blog Upload</h1>

            <div className='flex flex-col mx-auto w-100 '>

                <label className='text-indigo-600 dark:text-gray-200 text-xl my-3' >Title</label>
        
                <input type='text'  className='w-100 h-12 my-3 rounded-lg border-2 dark:bg-gray-300 border-gray-300 focus:outline-none focus:border-indigo-600' onChange={(e)=>{setTitle(e.target.value)}} />

                <label className='text-indigo-600 dark:text-gray-200 text-xl my-3  ' >Content</label>

                <textarea rows={5} onChange={(e)=>{setContent(e.target.value)}} className='w-100  my-3 rounded-lg border-2  dark:bg-gray-300 border-gray-300 focus:outline-none focus:border-indigo-600' ></textarea>

                <input type="file" onChange={handleChange} className="block my-2 w-full text-md text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-white dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 placeholder-gray-400"/>

                <label className='text-indigo-600 dark:text-gray-200 text-xl my-3  ' >Topics</label>

 
                <div className='flex flex-row w-full flex-wrap m-2'>
                {
                  topics.map((topic)=>{
                    return(
                      <div className='flex flex-row items-center justify-between'>
                        <div className={`h-10 ${selectedTopics.indexOf(topic.name)>-1 ? 'bg-indigo-700 dark:bg-slate-500 text-white':'bg-indigo-400 dark:bg-slate-300  text-white dark:text-gray-700'} px-3 py-2  rounded-md hover:bg-indigo-600 cursor-pointer m-2 `} id={topic.id} onClick={()=>handleTopicChange(topic.name)} >{topic.name}</div>
                      </div>
                    )
                  })
                }
                </div>
  
            </div>

            <button type="submit" className='w-28 h-11 bg-indigo-700 dark:bg-slate-500 px-4 mx-auto rounded-md text-white'>Upload</button>
          </form>
  
    </div>
    );
  
}   