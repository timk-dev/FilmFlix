import style from './style.module.css';

const User = () => {

    return(

        <main>
            <section className={style.user}>
                <div style={{width:'50%', height: '50%', paddingBottom: "75%", position: "relative"}}><iframe src="https://giphy.com/embed/l0Iy3yLzaEPZK4OCA" width="100%" height="100%" style={{position: 'absolute'}} frameBorder="0" class="giphy-embed" allowFullScreen></iframe></div>
                <p><a href="https://giphy.com/gifs/bye-im-out-disappear-l0Iy3yLzaEPZK4OCA">via</a></p>

                <h2>Before you go, know that your time is appreciated!</h2>
                <p>Thanks for visiting FilmFlix: The Streaming Clone.</p>
            </section>
        </main>

    );
}

export default User;