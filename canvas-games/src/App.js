import Snake from './components/snake/Snake'
import Tennis from './components/tennis/Tennis'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

function App() {
  return (
    <div className="App">
      <Tabs>
        <TabList>
          <Tab>Tennis Game</Tab>
          {/* <Tab>Snake Game</Tab> */}
        </TabList>
        <TabPanel>
          <Tennis/>
        </TabPanel>
        <TabPanel>
          <Snake/>
        </TabPanel>
      </Tabs>
    </div>
  );
}

export default App;
