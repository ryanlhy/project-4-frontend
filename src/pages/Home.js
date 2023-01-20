import { Container, Nav } from "react-bootstrap";
import SearchBar from "../components/SearchBar";
import NavBar from "../components/NavBar";
import ProductList from "../components/ProductList";
import products from '../data.js';


function Home() {
    return (
        <Container className="w-100">
            <NavBar/>
            <SearchBar/>
            <ProductList products={products}/>
        </Container>
    )
}

export default Home