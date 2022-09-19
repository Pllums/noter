interface IProps {
	user: { name: string };
}

export default function Nav(props: IProps) {
	return (
		<div className="container-fluid">
			<nav className="nav">
				<h1 className="nav-brand mx-auto">{props.user.name}</h1>
			</nav>
		</div>
	);
}
