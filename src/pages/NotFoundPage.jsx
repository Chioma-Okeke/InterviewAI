import { Link } from "react-router-dom";

function NotFoundPage() {
    return (
        <div className="relative min-h-screen dark:bg-primary-dark bg-secondary-light text-primary-dark dark:text-primary-light">
            <h2 className="font-bold text-3xl">Page not found!</h2>
            <p className="my-5">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Expedita iusto rerum distinctio cum voluptas dolore deleniti
                consectetur doloremque, magni repellendus vitae excepturi
                exercitationem rem totam unde? Fugiat sunt delectus voluptates!
            </p>

            <p>
                Go to the <Link to={"/"} className="text-brand-color underline">Home page</Link>
            </p>
        </div>
    );
}

export default NotFoundPage;
