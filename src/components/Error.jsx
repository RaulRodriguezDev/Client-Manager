import propTypes from 'prop-types'
const Error = ({children}) => {
return (
    <div className="text-center my-4 bg-red-600 text-white font-bold p-3 uppercase">
        {children}
    </div>
)
}

Error.propTypes = {
    children: propTypes.node,
}
export default Error