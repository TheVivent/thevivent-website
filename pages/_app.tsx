import "../styles/globals.scss";
import type { AppProps } from "next/app";
import { useEffect } from "react";
import useTheme, { useCurrentTheme } from "use-theme-hook";

function MyApp({ Component, pageProps }: AppProps) {
	const currentTheme = useCurrentTheme();

	useEffect(() => {
		handleThemeChange();
	}, [currentTheme]);

	const handleThemeChange = () => {
		if (typeof document === "undefined") return;

		const bodyClassList = document.body.classList;
		currentTheme === "dark"
			? bodyClassList.add("dark")
			: bodyClassList.remove("dark");
	};

	return (
		// <div className="vh-100 vw-100 m-0 p-0">
		<Component {...pageProps} />
		// </div>
	);
}
export default MyApp;
