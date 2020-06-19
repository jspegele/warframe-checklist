import React from 'react'
import { Tab } from 'semantic-ui-react'

import AdminDashboard from './AdminDashboard'
import AddItem from './AddItem'

const panes = [
  { menuItem: 'Dashboard', render: () => (<Tab.Pane><AdminDashboard /></Tab.Pane>) },
  { menuItem: 'Add Items', render: () => (<Tab.Pane><AddItem /></Tab.Pane>) }
]

const AdminTabs = () => <Tab panes={panes} />

export default AdminTabs
