import React from 'react';
import './home.css';
import Axios from 'axios'

class Home extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            posts : [],
            selectedFile : [],
            user : []
        }

        this.handleContentChange = this.handleContentChange.bind(this)
        this.handleImageChange = this.handleImageChange.bind(this)
        this.fileInput = React.createRef()
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handlePostClick = this.handlePostClick.bind(this)
        this.getAllPosts = this.getAllPosts.bind(this)
        this.getAuthor = this.getAuthor.bind(this)
    }

    componentDidMount(){
        this.getAuthor()
        this.getAllPosts()   
    }

    handleContentChange(e){
        this.setState({
            post : e.target.value
        })
    }

    handleImageChange(e){
        e.preventDefault()
        this.setState({
            selectedFile : this.fileInput.current.files[0]
        })
        console.log(this.fileInput.current.files[0])
    }

    handleSubmit(click){
        click.preventDefault();
        const body = {
            post : this.state.post,
            userId : localStorage.getItem('userId'),
            author : this.state.user.lastName + ' ' + this.state.user.firstName,
        }

        const formData = new FormData();
        formData.append("file", this.state.selectedFile);
        Axios.post('http://localhost:5000/api/post', {
        post: {
        post: this.state.post,
        userId: localStorage.getItem('userId'),
        file: this.state.selectedFile
        }
        }).then(this.getAllPosts());

        /*const submitData = new FormData();
        submitData.append('body', JSON.stringify(body));
        submitData.append('file', this.state.selectedFile)

        fetch('http://localhost:5000/api/post/',{
            method : 'POST',
            headers : {
                'Content-Type' : 'application/json',
                'Accept' : 'application/json',
                'Authorization' : 'Bearer ' + localStorage.getItem('token')
            },
            body : submitData
        })
        .then(() => {
            this.getAllPosts()
        })*/
    }

    handlePostClick(click){
        click.preventDefault();
        let id = click.target.className;
        window.location = "./PostDetails?id=" + id;
    }

    getAllPosts(){
        setTimeout(() => {
            fetch('http://localhost:5000/api/post/',{
                method : 'GET',
                headers : {
                    'Content-Type' : 'application/json',
                    'Accept' : 'application/json',
                    'Authorization' : 'Bearer ' + localStorage.getItem('token')
                },
            })
            .then(posts => posts.json())
            .then(posts => {
                this.setState({posts}) 
            })
            .catch(err=> {
                console.log('err', err);
                alert(err.error);
            })
        }, 300)
    }

    getAuthor(){
        setTimeout(() => {
            fetch('http://localhost:5000/api/auth/' + localStorage.getItem('userId'), {
                method : 'GET',
                headers : {
                    'Content-Type' : 'application/json',
                    'Accept' : 'application/json',
                    'Authorization' : 'Bearer ' + localStorage.getItem('token')
                },
                
            })
            .then(profile => profile.json())
            .then(profile =>{
                this.setState({user : profile})
            })
            .catch(err=> {
                console.log('err', err);
                alert(err.error);
            })
        }, 300)
    }

    render(){
        return(
            <>
                <div id='divCreatePost'>
                    <h1>Postez un message !</h1>
                    <form>
                        <div>
                            <textarea type='text' name='post' id='contentPost' placeholder='Message ...' onChange={this.handleContentChange} required></textarea>
                            <input type="file" accept="image/png, image/jpeg, image/gif" onChange={this.handleImageChange} ref={this.fileInput}></input>
                        </div>
                        <button type='submit' onClick={this.handleSubmit}>Publier</button>
                    </form>
                </div>
                <div id='divContainerPost'>
                    <h1>Fil d'actualité :</h1>
                    {this.state.posts.map((post) => 
                        <div key={post.id}>
                            <h2 className={post.id} onClick={this.handlePostClick}>
                                {post.author} :
                                <span className={post.id}>{post.post}</span>
                            </h2>
                            <p>
                                {post.likes}<i className="far fa-thumbs-up"></i>
                                <span>{post.commentsNumber}<i className="far fa-comment-dots"></i></span>
                                <span>{post.publishDate}</span>
                            </p>
                        </div>
                    )}
                </div>
            </>
        )
    }
}

export default Home;

