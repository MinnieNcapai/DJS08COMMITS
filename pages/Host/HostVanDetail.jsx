import React from "react"
import { useParams, Link, NavLink, Outlet } from "react-router-dom"
import { getHostVans } from "../../api"

export default function HostVanDetail() {
    // State for storing the current van, loading state, and error state
    const [currentVan, setCurrentVan] = React.useState(null)
    const [loading, setLoading] = React.useState(false)
    const [error, setError] = React.useState(null)
    // Get the 'id' parameter from the URL
    const { id } = useParams()

     // Fetch van details when the component mounts or the id changes
    React.useEffect(() => {
        async function loadVans() {
            setLoading(true)
            try {
                const data = await getHostVans(id) // Fetch the van data
                setCurrentVan(data) // Set the fetched van data
            } catch (err) {
                setError(err) // Set error if fetching fails
            } finally {
                setLoading(false)  // Set loading to false once done
            }
        }

        loadVans() // Call the loadVans function
    }, [id]) // Dependency on 'id', so it runs when 'id' changes

        // Show loading message while fetching data
    if (loading) {
        return <h1>Loading...</h1>
    }

    if (error) {
        return <h1>There was an error: {error.message}</h1>
    }

    const activeStyles = {
        fontWeight: "bold",
        textDecoration: "underline",
        color: "#161616"
    }

    return (
        <section>
            <Link
                to=".."
                relative="path"
                className="back-button"
            >&larr; <span>Back to all vans</span></Link>
            {currentVan &&
                <div className="host-van-detail-layout-container">
                    <div className="host-van-detail">
                        <img src={currentVan.imageUrl} />
                        <div className="host-van-detail-info-text">
                            <i
                                className={`van-type van-type-${currentVan.type}`}
                            >
                                {currentVan.type}
                            </i>
                            <h3>{currentVan.name}</h3>
                            <h4>${currentVan.price}/day</h4>
                        </div>
                    </div>

                    <nav className="host-van-detail-nav">
                        <NavLink
                            to="."
                            end
                            style={({ isActive }) => isActive ? activeStyles : null}
                        >
                            Details
                    </NavLink>
                        <NavLink
                            to="pricing"
                            style={({ isActive }) => isActive ? activeStyles : null}
                        >
                            Pricing
                    </NavLink>
                        <NavLink
                            to="photos"
                            style={({ isActive }) => isActive ? activeStyles : null}
                        >
                            Photos
                    </NavLink>
                    </nav>
                    <Outlet context={{ currentVan }} />
                </div>}
        </section>
    )
}
