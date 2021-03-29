import React from 'react';
import './home.css';

class Home extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            posts : [],
            selectedFile : [],
            user : []
        }

        // Contrôle de la valeur des this
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

    // Gestion des éléments passés dans le formulaire de création de post
    handleContentChange(e){
        this.setState({
            post : e.target.value
        })
    }

    // Gestion de l'image uploadé par l'utilisateur
    handleImageChange(e){
        e.preventDefault()
        this.setState({
            selectedFile : this.fileInput.current.files[0]
        })
        console.log(this.fileInput.current.files[0])
    }

    // Envoi à l'API de tous les éléments nécessaire à la création d'un post
    handleSubmit(click){
        console.log(this.state.user)
        click.preventDefault();
        const object = {
            post : this.state.post,
            userId : this.state.user.id,
            author : this.state.user.lastName + ' ' + this.state.user.firstName,
        }

        const submitData = new FormData();
        submitData.append('object', JSON.stringify(object));
        submitData.append('file', this.state.selectedFile)

        fetch('http://localhost:5000/api/post/',{
            method : 'POST',
            headers : {
                'Accept' : 'application/json',
                'Authorization' : 'Bearer ' + localStorage.getItem('token')
            },
            body : submitData
        })
        .then(() => {
            this.getAllPosts()
        })
    }

    // Gestion du clique sur l'un des posts affichés
    handlePostClick(click){
        click.preventDefault();
        let id = click.target.className;
        window.location = "./PostDetails?id=" + id;
    }

    // Récupération des posts dans la BDD depuis l'API
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
                console.log(posts.imageUrl)
                if (posts.imageUrl === undefined){
                    let img = document.getElementById('image')
                    img.remove()
                }
            })
            .catch(err=> {
                console.log('err', err);
                alert(err.error);
            })
        }, 300)
    }

    // Récupération des informations de l'utilisateur (notamment pour compléter les infos nécessaire à la création d'un post)
    getAuthor(){
        setTimeout(() => {
            fetch('http://localhost:5000/api/auth/' + localStorage.getItem('token'), {
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
                        <label for='contentPost'>
                            <textarea type='text' name='post' id='contentPost' placeholder='Message ...' onChange={this.handleContentChange} required></textarea>
                            <input type="file" accept="image/png, image/jpeg, image/gif" onChange={this.handleImageChange} ref={this.fileInput}></input>
                        </label>
                        <button type='submit' onClick={this.handleSubmit}>Publier</button>
                    </form>
                </div>
                <div id='divContainerPost'>
                    <h1>Fil d'actualité :</h1>
                    {this.state.posts.map((post) => 
                        <div id='divChildPost' key={post.id}>
                            <h2 className={post.id} onClick={this.handlePostClick}>
                                {post.author} :
                                <div>
                                    <span className={post.id}>{post.post}</span>
                                    <span><img src={'http://localhost:5000/images/' + post.imageUrl.split('/images')[2]} id='image' className={post.id} alt='postImage'></img></span>
                                </div>
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

