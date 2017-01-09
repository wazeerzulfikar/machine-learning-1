#!/usr/bin/python

'''@data_append

This file allows methods defined from the Base, or Base_Data superclass to be
overridden, if needed.

Note: the term 'dataset' used throughout various comments in this file,
      synonymously implies the user supplied 'file upload(s)', and XML url
      references.

'''

from flask import current_app
from flask import session
from brain.session.base import Base
from brain.session.base_data import Base_Data
from brain.database.save_entity import Save_Entity


class Data_Append(Base, Base_Data):
    '''@Data_Append

    This class provides an interface to update existing stored entities within
    the sql database.

    Note: this class is invoked within 'load_data.py'

    Note: inherit base methods from superclass 'Base', 'Base_Data

    '''

    def __init__(self, premodel_data):
        '''@__init__

        This constructor is responsible for defining class variables, using the
        superclass 'Base', and 'Base_Data' constructor, along with the
        constructor in this subclass.

        @super(), implement 'Base', and 'Base_Data' superclass constructor
            within this child class constructor.

        @self.uid, the logged-in user (i.e. userid).

        Note: the superclass constructor expects the same 'premodel_data'
              argument.

        '''

        super(Data_Append, self).__init__(premodel_data)
        self.observation_labels = []
        self.list_error = []
        self.dataset = []
        self.model_type = premodel_data['data']['settings']['model_type']

        if 'uid' in session:
            self.uid = int(session['uid'])
        else:
            self.uid = current_app.config.get('USER_ID')

    def save_entity(self, session_type, session_id):
        '''@save_entity

        This method overrides the identical method from the inherited
        superclass, 'Base_Data'. Specifically, this method updates an
        existing entity within the corresponding database table,
        'tbl_dataset_entity'.

        @session_id, is synonymous to 'entity_id', and provides context to
            update 'modified_xx' columns within the 'tbl_dataset_entity'
            database table.

        '''

        premodel_settings = self.premodel_data['data']['settings']
        premodel_entity = {
            'title': premodel_settings.get('session_name', None),
            'uid': self.uid,
            'id_entity': session_id,
        }
        db_save = Save_Entity(premodel_entity, session_type)

        # save dataset element
        db_return = db_save.save()

        # return
        if db_return['status']:
            return {'status': True, 'error': None}
        else:
            self.list_error.append(db_return['error'])
            return {'status': False, 'error': self.list_error}
