import React from 'react';
import {Input} from "./Input";

import './ProfileEditInstitutorForm.scss';

const ProfileEditInstitutorForm = () => {

    return <form className='page form-ins'>
        <h4 className="form-title">Lundi</h4>
        <div>
            <Input
                type="text"
                id="mondaystart"
                name="mondaystart"
                placeholder="Heure de début"
                secondary={true}
            />
            <Input
                type="text"
                id="mondayend"
                name="mondayend"
                placeholder="Heure de fin"
                secondary={true}
            />
        </div>
        <h4 className="form-title">Mardi</h4>
        <div>
            <Input
                type="text"
                id="tuesdaystart"
                name="tuesdaystart"
                placeholder="Heure de début"
                secondary={true}
            />
            <Input
                type="text"
                id="tuesdayend"
                name="tuesdayend"
                placeholder="Heure de fin"
                secondary={true}
            />
        </div>
        <h4 className="form-title">Mercredi</h4>
        <div>
            <Input
                type="text"
                id="wedstart"
                name="wedstart"
                placeholder="Heure de début"
                secondary={true}
            />
            <Input
                type="text"
                id="wedend"
                name="wedend"
                placeholder="Heure de fin"
                secondary={true}
            />
        </div>
        <h4 className="form-title">Jeudi</h4>
        <div>
            <Input
                type="text"
                id="thursdaystart"
                name="thursdaystart"
                placeholder="Heure de début"
                secondary={true}
            />
            <Input
                type="text"
                id="thursdayend"
                name="thursdayend"
                placeholder="Heure de fin"
                secondary={true}
            />
        </div>
        <h4 className="form-title">Vendredi</h4>
        <div>
            <Input
                type="text"
                id="fridaystart"
                name="fridaystart"
                placeholder="Heure de début"
                secondary={true}
            />
            <Input
                type="text"
                id="fridayend"
                name="fridayend"
                placeholder="Heure de fin"
                secondary={true}
            />
        </div>
        <h4 className="form-title">Samedi</h4>
        <div>
            <Input
                type="text"
                id="saturdaystart"
                name="saturdaystart"
                placeholder="Heure de début"
                secondary={true}
            />
            <Input
                type="text"
                id="saturdayend"
                name="saturdayend"
                placeholder="Heure de fin"
                secondary={true}
            />
        </div>
        <h4 className="form-title">Dimanche</h4>
        <div>
            <Input
                type="text"
                id="sundaystart"
                name="sundaystart"
                placeholder="Heure de début"
                secondary={true}
            />
            <Input
                type="text"
                id="sundayend"
                name="sundayend"
                placeholder="Heure de fin"
                secondary={true}
            />
        </div>
    </form>

}

export default ProfileEditInstitutorForm;
