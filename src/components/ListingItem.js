import { Link } from 'react-router-dom'
import { ReactComponent as DeleteIcon } from '../assets/svg/deleteIcon.svg'
import { ReactComponent as EditIcon } from '../assets/svg/editIcon.svg'


const ListingItem = ({ listing, id, onDelete, onEdit }) => {
    
  return (
    <li className='categoryListing'>
        <Link to={`/category/${listing.type}/${id}`} className='categoryListingLink'>
            <img src={listing.imageUrls[0]} alt={listing.release} className='categoryListingImg' />
            <div className='categoryListingDetails'>
                <p className='categoryListingLocation'>
                    Shipping from {listing.location}
                </p>
                <p className='categoryListingName'>
                    {listing.release}
                </p>
                <p className='categoryListingPrice'>
                    
                    {listing.deal ? `$${listing.discPrice} was $${listing.regPrice}` : `$${listing.regPrice}`}
                    
                </p>
                <div className='categoryListingInfoDiv'>
               
                    <p className='categoryListingInfoText'>
                    {listing.artist}
                    </p>
                    <hr />
                    <p className='categoryListingInfoText'>
                    {listing.year}
                    </p>
                    <hr />
                    <p className='categoryListingInfoText'>
                    {listing.type}
                    </p>

                </div>
                <div className='categoryListingInfoDiv'>
               
                    <p className='categoryListingInfoText'>
                    {listing.comments}
                    </p>
                </div>
            </div>
        </Link>

        { onDelete && (
            <DeleteIcon className='removeIcon' fill='rgb(231, 76, 60)' onClick={() => onDelete(listing.id, listing.name)} />
        )}
        { onEdit && <EditIcon className='editIcon' onClick={() => onEdit(id)}/>}
    </li>
  )
}
export default ListingItem
