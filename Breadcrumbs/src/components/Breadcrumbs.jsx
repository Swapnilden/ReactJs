import { Link, useLocation } from "react-router-dom"

const Breadcrumbs = () => {
    const { pathname } = useLocation();
    const pathnames = pathname.split("/").filter((x) => x);
    let breadcrumbpath = "";

    return (
        <div className="breadcrumbs">
            {pathnames.length > 0 && (<Link to={"/"}>Home</Link>)}
            {
                pathnames.map((name, index) => {
                    breadcrumbpath += `/${name}`
                    const isLast = index === pathnames.length - 1;
                    return isLast?(
                        <span key={breadcrumbpath}>/ {name}</span>
                    ):(
                        <span key={breadcrumbpath}>/{" "}<Link to={breadcrumbpath}>{name}</Link></span>
                    )
                })
            }
        </div>
    )
}

export default Breadcrumbs;