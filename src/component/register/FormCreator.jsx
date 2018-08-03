import React from 'react';
import {observer} from "mobx-react";

export default observer(({ field }) => (
    <div>
        <label htmlFor={field.id}>
            {field.label}
        </label>
        <input {...field.bind()} />
        <p>{field.error}</p>
    </div>
));
