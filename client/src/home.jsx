import React, { Component } from 'react'
import './home.css'
import './c_issue.css'
import './issue.css'
import Aws from './aws.png'
import S3 from './s3.png'
import Ec2 from './ec2.png'
import Delete from "./delete.png"
import Copy from "./copy.png"


class Home extends Component {

    state = {

      dragging: false,
      files:'',
      type:false,
      words: '',
      location: '',
      handles: false,
      imgload:false,

    }


    uploads = (e) => {

        let files = e.target.files;
        let file = files[0];
        let formdata = new FormData();
        formdata.append('file', file)
  
  
        let reader = new FileReader();
        reader.readAsDataURL(files[0])
  
  
        return reader.onload = (e) => {
  
          if ((file.type === "image/jpeg" || file.type === "image/png")) {
            this.setState({imgload:true})
          
        fetch(`http://localhost:8080/xtrail/photos`, { method: 'POST', body: formdata }).then((response) => response.json()).then(data => {
          this.setState({imgload:false})
                const { path } = data;
                  this.setState({ files: path, })
            })
          } else {
            this.setState({ type: true })
              setTimeout(() => {
                this.setState({ type:false })
            },1000)
          }
  
    }
        
    }



    handleDrag = (e) => {
        e.preventDefault()
        e.stopPropagation()

      }
      handleDragIn = (e) => {
        e.preventDefault()
          e.stopPropagation()
          this.dragCounter++
          
          if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
            this.setState({dragging: true})
          }
      }
      handleDragOut = (e) => {
        e.preventDefault()
          e.stopPropagation()
          this.dragCounter--
          if (this.dragCounter > 0) return
          this.setState({dragging: false})
      }

    
      handleDrop = (e) => {    
        e.preventDefault()
          e.stopPropagation()
          this.setState({ dragging: false })
          
          
          if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
             const files= e.dataTransfer.files
              const file = files[0];
              let formdata = new FormData();
              formdata.append('file', file)


              let reader = new FileReader();
            reader.readAsDataURL(files[0])
            
            return reader.onload = (f) => {
               if ((file.type === "image/jpeg" || file.type === "image/png")) {
                    this.setState({ imgload: true })
                    console.log('ffffff')
                   fetch(`http://localhost:8080/xtrail/photos`, { method: 'POST', body: formdata }).then((response) => response.json()).then(data => {
                    console.log('ffff')
                     const { path } = data;
                     this.setState({imgload:false})
                        this.setState({ files: path, })
                  })
                      e.dataTransfer.clearData()
                      this.dragCounter = 0
                  } else {
                    this.setState({ type: true })
                      setTimeout(() => {
                        this.setState({ type:false })
                    },1000)
                  }


                }
             
          }
      }



   


  componentDidMount() {
   
        this.dragCounter = 0
        if (this.state.files.length<=0) {
            const div = document.querySelector('.drag-drop');
       
            div.addEventListener('dragenter', this.handleDragIn)
            div.addEventListener('dragleave', this.handleDragOut)
            div.addEventListener('dragover', this.handleDrag)
            div.addEventListener('drop', this.handleDrop)
        }
       
      }
    componentWillUnmount() {
       if (this.state.files.length<=0) {
          const div = document.querySelector('.drag-drop');
        div.removeEventListener('dragenter', this.handleDragIn)
        div.removeEventListener('dragleave', this.handleDragOut)
        div.removeEventListener('dragover', this.handleDrag)
        div.removeEventListener('drop', this.handleDrop)
    }
        }

  deleting = () => {
          this.setState({files:''})
  }
  
 textArea = () => {
    const ell = this.refs.textarea
    ell.select()
    document.execCommand("copy")
    this.setState({ copyurl: true })
    
    setTimeout(() => {
        this.setState({ copyurl: false })
    },5000)
}

    render() {

        return (<div className="home">
            <div className="hero-page">
                <img src={Aws} alt='aws' className="aws" />
                <h1 className="aws-h1">AWS Web Services</h1>
                <div className="aws-div-w"></div>
            </div>
            <div className="home-body">
                <div  className="aws-div">
                    <div className="aws-div1">
                        <h1>This is my MERN Stack site Hosted on aws useing the following services </h1>
                </div>
                    <div className="aws-div2">
                    <div className="aws-compute">
                            <div className="img-elastic">
                                <img src={Ec2} alt="ec2" className="ec2-s3" />
                            </div>
                            <h1 className="s3-text">EC2 Elastic Compute Cloud </h1>
                 <div className="img-elastic2">
                                <p>Amazon Elastic Compute Cloud
                                    is a part of Amazon.com's
                                    cloud-computing platform,
                                    Amazon Web Services, that
                                    allows users to rent virtual
                                    computers on which to run
                                    their own computer
                                    applications.</p>
                 </div>
                        </div>
                        <div className="aws-compute">
                            <div className="img-elastic">
                            <img src={S3} alt="ec2" className="ec2-s3" />
                           
                        </div>
                            <h1 className="s3-text">S3 Bucket</h1>
                            <div className="img-elastic2">
                                <p>Amazon S3 bucket is a public
                                    cloud storage resource
                                    available in Amazon Web
                                    Services' (AWS) Simple
                                    Storage Service (S3), an
                                    object storage offering.
                                    Amazon S3 buckets, which are
                                    similar to file folders,
                                    store objects, which consist
                                    of data and its descriptive
                                    metadata.</p>
                 </div>
                        </div>
                    </div>
                    <div className="spaceing"></div>
                </div>

                <textarea ref='textarea' value={this.state.files} className="project" />
                                     
                <div className="upload-aws">
                    

             {this.state.files.length>2 &&<div style={{ backgroundColor: this.state.copyurl && "rgb(60, 255, 0)" }} className="aws-url"><div style={{ justifyContent: this.state.copyurl && "center" }} className="url-div"><span style={{ fontWeight: this.state.copyurl && "bold", color: this.state.copyurl && "white" }}>{this.state.copyurl ? 'Copied to clipboard' : `URL ${this.state.files.slice(0, 38)}${this.state.copyurl?"...":''}`}</span></div><img onClick={this.textArea} src={Copy} alt="url" style={{filter: this.state.copyurl&&"invert(0%)"}} className="url-img"/></div>}
                {this.state.imgload===true?<div className="imgload"><div className="kanji"></div></div> :this.state.files.length <= 0 ? <div style={{ borderColor: this.state.type ? 'red' : this.state.dragging &&'orange' }} className="drag-drop">
                        <span style={{color:this.state.type?'red':this.state.dragging&&'orange'}} className='plus'>+</span>
                        <input className='in-file' type='file'  onChange={(e) => { this.uploads(e) }} />
                        <span style={{ color: this.state.type ? 'red' : this.state.dragging && 'orange' }} className='add-image'>{this.state.type ? 'incorrect type of file' : this.state.dragging ? 'Drop here' : 'Add or Drag image here'}</span>
                    </div>:
                    
                   <div className="comment-image1-box">
                        <img style={{ marginTop: '0px', marginLeft: '0px', position: 'absolute' }} src={this.state.files} alt='issues' className='comment-image1' />
                        <div className="complery">
                        <div onClick={this.deleting} className="black-d">
                        <img  src={Delete} alt='delete' className='delete-image1' />
                     </div>
                  </div>
                    </div>
                    
            }
                </div>
                
            <div className="info-aw">
             
                </div>

                </div>
        </div>)
    }
}

export default Home;
