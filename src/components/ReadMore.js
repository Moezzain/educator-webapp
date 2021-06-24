import React from 'react';
import Button from '@material-ui/core/Button';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
const ReadMore = (note,renderNotes) => {
    return (
        <div>
            <Button onClick={() => {renderNotes()}}>
                <ArrowBackIcon/>
            </Button>
        <div style={{overflow:'auto'}}>
            {note.text}
        </div>
        </div>
    )
}

export default ReadMore