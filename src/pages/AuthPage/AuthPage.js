import "./AuthPage.scss";

import { selectCurrentUser } from "../../store/user/userSelector";
import { useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";

import { getRandomElementsFromArray } from "../../scripts/dataUtils";

import TextRotationAnimation from "../../components/TextRotationAnimation/TextRotationAnimation";
import Signup from "../../components/Signup/Signup";
import SignupVerify from "../../components/SignupVerify/SignupVerify";
import Signin from "../../components/Signin/Signin";

function AuthPage({ action }) {
	const params = useParams();
	const navigate = useNavigate();
	const user = useSelector(selectCurrentUser);

	if (user) {
		navigate("/profile");
	}

	const imageList = [
		{
			author: "Matt Mutlu",
			author_url: "https://unsplash.com/@mattmutluu",
			image_name: "matt-mutlu-LzifKdVVk7g-unsplash.jpg",
		},
		{
			author: "Miguel Carraça",
			author_url: "https://unsplash.com/@mcmiles",
			image_name: "miguel-carraca-i-UZYHBGVVE-unsplash.jpg",
		},
		{
			author: "Matt Mutlu",
			author_url: "https://unsplash.com/@mattmutluu",
			image_name: "matt-mutlu-rR7qB4Fb3rA-unsplash.jpg",
		},
		{
			author: "Paul Bill",
			author_url: "https://unsplash.com/@hoffman11",
			image_name: "paul-bill---D4Gg8RhIk-unsplash.jpg",
		},
		{
			author: "Lala Azizli",
			author_url: "https://unsplash.com/@lazizli",
			image_name: "lala-azizli-WySEVkh2qHs-unsplash.jpg",
		},
		{
			author: "Denys Nevozhai",
			author_url: "https://unsplash.com/@dnevozhai",
			image_name: "denys-nevozhai--F3wMFrZ7z0-unsplash.jpg",
		},
	];

	const photo = getRandomElementsFromArray(imageList, 1)[0];

	return (
		<main className="auth-page">
			<div className="auth-page__image-wrapper">
				<img
					src={`${process.env.REACT_APP_SERVER_URL}/images/${photo.image_name}`}
					alt={`City street photography by ${photo.author}`}
					className="auth-page__image"
				/>
				<div className="auth-page__tagline-wrapper">
					<div className="auth-page__tagline">
						<TextRotationAnimation textArray={["What", "Walk"]} />
					</div>
					<div className="auth-page__tagline">To Explore.</div>
				</div>
				<div className="auth-page__image-credit">
					<p className="auth-page__image-credit-text">
						Photo by
						<a href={photo.author_url}>{" " + photo.author + " "}</a>
						on
						<a href="https://unsplash.com/">{` Unsplash`}</a>
					</p>
				</div>
			</div>

			<div className="auth-page__form-wrapper">
				{action === "signup" && <Signup />}
				{action === "verify" && (
					<SignupVerify verification_code={params.verification_code} />
				)}
				{action === "signin" && <Signin />}
			</div>
		</main>
	);
}

export default AuthPage;
