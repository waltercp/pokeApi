import axios from "axios";


const useFetch = (url, onSuccess, onError) => {
    axios.get(url)
        .then(onSuccess)
        .catch(onError);
}

export default useFetch