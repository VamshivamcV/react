import { useState, useEffect } from "react";
import { useParams, useNavigate, Link, useLocation } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import NotFound from "../components/NotFound";
import DefinitionSearch from "../components/DefinationSearch";
import useFetch from "../hooks/UseFetch";

export default function Definition() {
	// const [word, setWord] = useState();
	// const [notFound, setNotFound] = useState(false);
    // const [error, setError] = useState(false);
	const navigate = useNavigate();
	const location = useLocation();
	let { search } = useParams();

	const [word, errorStatus] = useFetch("http://api.dictionaryapi.dev/api/v2/entries/en/" + search);
    

	if (errorStatus === 404) {
		return (
			<>
				<NotFound />
				<Link 
					to="/dictionary"
				>
					<button 
					className="bg-purple-400 hover:bg-purple-700 text-white font-bold py-1 px-2 rounded"
					>
					Search Another
					</button>
				</Link>
			</>
		);
	}
    if (errorStatus) {
		return (
			<>
				<p>Something went wrong, please try again?</p>
				<Link 
					to="/dictionary"
				>
					<button 
					className="bg-purple-400 hover:bg-purple-700 text-white font-bold py-1 px-2 rounded"
					>
					Search Another
					</button>
				</Link>
			</>
		);
	}
	return (
		<>
			{word?.[0]?.meanings ? (
				<>
					<h1>Here is a definition: </h1>
					{word[0].meanings.map((meaning) => {
						return (
							<p key={uuidv4()}>
								{meaning.partOfSpeech + ": "}
								{meaning.definitions[0].definition}
							</p>
						);
					})}
                    <p>Search again:</p>
                    <DefinitionSearch / >
				</>
			) : null}
		</>
	);
}
