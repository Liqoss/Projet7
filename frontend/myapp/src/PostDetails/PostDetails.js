import React from 'react';
import './postDetails.css';

class PostDetails extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            post : [],
            comments : [],
            user : [],
            singOrPlu : '',
            admin : false,
            like : 0
        }

        this.getAuthor = this.getAuthor.bind(this)
        this.getPost = this.getPost.bind(this);
        this.handleCommentChange = this.handleCommentChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.getComment = this.getComment.bind(this);
        this.handleDeletePost = this.handleDeletePost.bind(this);
        this.handleCommentDelete = this.handleCommentDelete.bind(this);
        this.handleLike = this.handleLike.bind(this);
        this.adjustCommentsNumber = this.adjustCommentsNumber.bind(this);
        this.getLikes = this.getLikes.bind(this);
    }

    componentDidMount() {
        this.getAuthor();
        this.getPost();
        this.getComment();
        this.getLikes();
    };

    getAuthor(){
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
            console.log(this.state.user)
        })
        .catch(err=> {
            console.log('err', err);
            alert(err.error);
        })
    }

    getPost() {
        let idPost = window.location.search.substr('4');

        fetch('http://localhost:5000/api/post/' + idPost,{
            method : 'GET',
            headers : {
                'Content-Type' : 'application/json',
                'Accept' : 'application/json',
                'Authorization' : 'Bearer ' + localStorage.getItem('token')
            },
        })
        
        .then(post => post.json())
        .then(post => {
            this.setState({post})
        })
        .catch(err=> {
            console.log('err', err);
            alert(err.error);
        })
    }

    handleCommentChange(e){
        e.preventDefault();
        this.setState({
            comment : e.target.value
        })
    }

    handleSubmit(click){
        click.preventDefault();

        const submitData = {
            comment : this.state.comment,
            userId : localStorage.getItem('userId'),
            postId : window.location.search.substr('4'),
            author : this.state.user.lastName + ' ' + this.state.user.firstName
        };

        fetch('http://localhost:5000/api/comment/',{
            method : 'POST',
            headers : {
                'Content-Type' : 'application/json',
                'Accept' : 'application/json',
                'Authorization' : 'Bearer ' + localStorage.getItem('token')
            },
            body : JSON.stringify(submitData)
        })
        .then(() => {
            this.getComment()
        })
    }

    getComment(){
        let idPost = window.location.search.substr('4');

        fetch('http://localhost:5000/api/comment/' + idPost,{
            method : 'GET',
            headers : {
                'Content-Type' : 'application/json',
                'Accept' : 'application/json',
                'Authorization' : 'Bearer ' + localStorage.getItem('token')
            },
        })
        
        .then(comments => comments.json())
        .then(comments => {
            console.log(comments)
            this.setState({comments})
            this.getPost()
        })
        .catch(err=> {
            console.log('err', err);
            alert(err.error);
        })
    }

    handleDeletePost(click){
        let idPost = click.target.id;
        console.log(this.state.post.authorId)
        click.preventDefault();
        // eslint-disable-next-line no-restricted-globals
        if (this.state.post.authorId == localStorage.getItem('userId') || localStorage.getItem('userId') === 9){
            if (window.confirm('Voulez-vous vraiment supprimer le post ?')){
                fetch('http://localhost:5000/api/post/' + idPost, {
                    method : 'DELETE',
                    headers : {
                        'Content-Type' : 'application/json',
                        'Accept' : 'application/json',
                        'Authorization' : 'Bearer ' + localStorage.getItem('token')
                    }
                })
                .then(window.location = './Home')
                .catch(err=> {
                    console.log('err', err);
                    alert(err.error);
                })
            }
        } else{
            console.log('Vous n\'êtes pas autorisé à supprimer ce post !')
        }
    }

    handleCommentDelete(click){
        click.preventDefault();
        // eslint-disable-next-line no-restricted-globals
        console.log(sessionStorage.getItem('authorId'))
        console.log(click.target.id)
        if (sessionStorage.getItem('authorId') === localStorage.getItem('userId') || localStorage.getItem('userId') === 9){
            if (window.confirm('Voulez-vous vraiment supprimer le commentaire ?')){
                const idComment = click.target.id;

                fetch('http://localhost:5000/api/comment/' + idComment, {
                    method : 'DELETE',
                    headers : {
                        'Content-Type' : 'application/json',
                        'Accept' : 'application/json',
                        'Authorization' : 'Bearer ' + localStorage.getItem('token')
                    }
                })
                .then(() => {
                    this.adjustCommentsNumber()
                    this.getPost()
                    this.getComment()
                })
                .catch(err=> {
                    console.log('err', err);
                    alert(err.error);
                })
            }
        } else {
            console.log('Vous n\'êtes pas autorisé à supprimer ce commentaire !')
        }
    }

    adjustCommentsNumber(){
        fetch('http://localhost:5000/api/post/' + window.location.search.substr('4'), {
            method : 'PUT',
            headers : {
                'Content-Type' : 'application/json',
                'Accept' : 'application/json',
                'Authorization' : 'Bearer ' + localStorage.getItem('token')
            },
        })
        .then(this.getPost())
        .catch(err=> {
            console.log('err', err);
            alert(err.error);
        })
    }

    handleLike(click){
        const submitData = {
            postId : click.target.id,
            userId : localStorage.getItem('userId')
        }

        click.preventDefault();
        fetch('http://localhost:5000/api/post/like', {
            method : 'POST',
            headers : {
                'Content-Type' : 'application/json',
                'Accept' : 'application/json',
                'Authorization' : 'Bearer ' + localStorage.getItem('token')
            },
            body : JSON.stringify(submitData)
        })
        .then(() => {
            this.getPost()
            this.getLikes()
        })
        .catch(err=> {
            console.log('err', err);
            alert(err.error);
        })
    }

    getLikes(){
        const submitData = {
            postId : window.location.search.substr('4'),
            userId : localStorage.getItem('userId')
        }

        fetch('http://localhost:5000/api/post/hasLiked', {
            method : 'POST',
            headers : {
                'Content-Type' : 'application/json',
                'Accept' : 'application/json',
                'Authorization' : 'Bearer ' + localStorage.getItem('token')
            },
            body : JSON.stringify(submitData)
        })
        .then(response => response.json())
        .then((response) => {
            const e = document.getElementsByClassName('fa-thumbs-up');
            if (response === 0){
                e[0].style.color = 'limegreen'
            } else if (response === 1){
                e[0].style.color = 'black'
            }
        })
        .catch(err=> {
            console.log('err', err);
            alert(err.error);
        })
    }

    render(){
        return (
            <>
                <div id='divPostDetails'>
                    <h1>
                        {this.state.post.author} :
                        <span>{this.state.post.post}</span>
                    </h1>
                    <p>
                        {this.state.post.likes}<i id={this.state.post.id} onClick={this.handleLike} className="far fa-thumbs-up"></i>
                        <span>{this.state.post.commentsNumber}<i className="far fa-comment-dots"></i></span>
                        <span>{this.state.post.publishDate}</span>
                    </p>
                    <button id={this.state.post.id} onClick={this.handleDeletePost}>Supprimer la publication</button>
                </div>

                <div id='divCreateComment'>
                    <h1>Réagissez au post !</h1>
                    <form>
                        <textarea type='text' name='comment' id='contentComment' placeholder='Commentaire ...' onChange={this.handleCommentChange} required></textarea>
                        <button type='submit' onClick={this.handleSubmit}>Publier</button>
                    </form>
                </div>

                {this.state.comments.map(comment =>
                <div key={comment.id} id='divComments'>
                    <h1>{comment.author} :</h1>
                    <p>
                        {comment.comment}
                        <span id={comment.id} onChange={sessionStorage.setItem('authorId', comment.authorId)} onClick={this.handleCommentDelete}><i id={comment.id} className="far fa-trash-alt"></i></span>
                        <span>Publié le {comment.publishDate}</span>
                    </p>
                </div>
                )}
            </>
        )
    }
}

export default PostDetails;