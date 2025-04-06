import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Card } from 'react-native-paper';
import SingleMetricCard from './cards/SingleMetricCard';
import SingleMetricWithPercentageCard from './cards/SingleMetricWithPercentageCard';
import SingleMetricWithPieChartCard from './cards/PieChartCard'
import PopularPagesTableCard from './cards/PopularPagesTableCard';
import SourcesOfTrafficTableCard from './cards/SourcesOfTrafficTableCard'

const DashboardCards = ({ data }) => {
  if (!data || data.length === 0) {
    return <Text style={styles.noDataText}>No data available at the moment.</Text>;
  }

  return (

    <>
      <Text style={styles.pageTitleText} >
        Traffic
      </Text>
    <SingleMetricCard
      label="Users"
      count={data.find(item => item.metricName === 'PageTitle')?.information?.[0]?.sessionsCount ?? 'Unknown'}
      description="Users that visited your page (excluding bots)"
  />
    <SingleMetricCard
      label="Bot sessions"
      count={data.find(item => item.metricName === 'Traffic')?.information?.[0]?.totalBotSessionCount ?? 'Unknown'}
      description="This traffic is likely not from humans but rather from bots indexing the web."
  />
  <PopularPagesTableCard
    label="Popular Pages"
    data={data.find(item => item.metricName === 'PopularPages')?.information ?? []}
    />

  <Text style={styles.pageTitleText} >
    Sources of traffic
  </Text>
  <SourcesOfTrafficTableCard
    label="Referrer"
    data={data.find(item => item.metricName === 'ReferrerUrl')?.information ?? []}
  />
<Text style={styles.pageTitleText} >
  User Engagement
</Text>
<SingleMetricCard
  label="Pages per session"
  count={data.find(item => item.metricName === 'Traffic')?.information?.[0]?.pagesPerSessionPercentage ?? 'Unknown'}
  description="The average number of pages a user visits during a session. More pages can suggest heigher engagement, or could indicate that content is not easily found."

/>
<SingleMetricCard
  label="Average Scroll depth"
  count={data.find(item => item.metricName === 'ScrollDepth')?.information?.[0]?.averageScrollDepth ?? 'Unknown'}
  description="This is the % that the user (on average) scrolls your page. A low % suggests that users never reach the end of your page."
  unit="%"

/>
<SingleMetricCard
  label="Time on page"
  count={data.find(item => item.metricName === 'EngagementTime')?.information?.[0]?.totalTime ?? 'Unknown'}
  description="The average number of seconds users spend on your page. A low number might indicate the page is not relevant enough."
  unit="s"

/>
<SingleMetricCard
  label="Time Active on page"
  count={data.find(item => item.metricName === 'EngagementTime')?.information?.[0]?.activeTime ?? 'Unknown'}
  description="This is the time in seconds the users are active on your page. Typing, moving the mouse or scrolling."
  unit="s"

/>
<SingleMetricWithPercentageCard
  label="Dead Clicks"
  count={data.find(item => item.metricName === 'DeadClickCount')?.information?.[0]?.pagesViews ?? 'Unknown'}
  description="A dead click is a click that does nothing. A high number of dead clicks might indicate navigation issues or poor styling"
  sessionwithMetricPercentage={data.find(item => item.metricName === 'DeadClickCount')?.information?.[0]?.sessionsWithMetricPercentage ?? null}  // Set null for missing data
/>
<SingleMetricWithPercentageCard
  label="Quick Back"
  count={data.find(item => item.metricName === 'QuickbackClick')?.information?.[0]?.pagesViews ?? 'Unknown'}
  description="A quick back is if a user immidiatly returns after landing on a page. This might indicate content that is not relevant or poor navigation so that the user clicks somewhere they did not intend."
  sessionwithMetricPercentage={data.find(item => item.metricName === 'QuickbackClick')?.information?.[0]?.sessionsWithMetricPercentage ?? null}  // Set null for missing data
/>




<Text style={styles.pageTitleText} >
  User Demographics
</Text>
<SingleMetricWithPieChartCard
  label="Browser"
  data={data.find(item => item.metricName === 'Browser')?.information ?? []}
/>
<SingleMetricWithPieChartCard
  label="Country"
  data={data.find(item => item.metricName === 'Country')?.information ?? []}
/>
<SingleMetricWithPieChartCard
  label="Device"
  data={data.find(item => item.metricName === 'Device')?.information ?? []}
/>
<SingleMetricWithPieChartCard
  label="Operating System"
  data={data.find(item => item.metricName === 'OS')?.information ?? []}
/>



<Text style={styles.pageTitleText} >
  Errors
</Text>
<SingleMetricWithPercentageCard
  label="Excessive Scroll"
  count={data.find(item => item.metricName === 'ExcessiveScroll')?.information?.[0]?.pagesViews ?? 'Unknown'}
  description="A high excessive scroll metric indicates that users are struggling to find relevant content or are disengaged, often due to poor navigation, overwhelming content, or ineffective design. It suggests a need for better content organization or UI improvements to enhance user experience."
  sessionwithMetricPercentage={data.find(item => item.metricName === 'ExcessiveScroll')?.information?.[0]?.sessionsWithMetricPercentage ?? null}  // Set null for missing data
/>
<SingleMetricWithPercentageCard
  label="Rage Clicking"
  count={data.find(item => item.metricName === 'RageClickCount')?.information?.[0]?.pagesViews ?? 'Unknown'}
  description="A high rage clicking metric indicates that users are frustrated with unresponsive elements or poor interface design. It suggests that interactions are failing, leading to user irritation and a negative experience."
  sessionwithMetricPercentage={data.find(item => item.metricName === 'RageClickCount')?.information?.[0]?.sessionsWithMetricPercentage ?? null}  // Set null for missing data
/>
<SingleMetricWithPercentageCard
  label="Javascript Error"
  count={data.find(item => item.metricName === 'ScriptErrorCount')?.information?.[0]?.pagesViews ?? 'Unknown'}
  description="A high JavaScript error metric indicates frequent issues with the site's functionality, often causing broken features or disrupted user interactions. It suggests a need for better code quality, testing, and error handling to improve user experience."
  sessionwithMetricPercentage={data.find(item => item.metricName === 'ScriptErrorCount')?.information?.[0]?.sessionsWithMetricPercentage ?? null}  // Set null for missing data
/>
<SingleMetricWithPercentageCard
  label="Error on click"
  count={data.find(item => item.metricName === 'ErrorClickCount')?.information?.[0]?.pagesViews ?? 'Unknown'}
  description="A high error clicking metric indicates that users are repeatedly clicking on elements that aren't functioning as expected, often due to broken links, unresponsive buttons, or errors. It suggests a need for improved functionality and error handling to prevent user frustration."
  sessionwithMetricPercentage={data.find(item => item.metricName === 'ErrorClickCount')?.information?.[0]?.sessionsWithMetricPercentage ?? null}  // Set null for missing data
/>
    </>
  );
};

const styles = StyleSheet.create({
  card: { marginBottom: 16 },
  infoContainer: { marginBottom: 8 },
  text: { fontSize: 16, marginVertical: 4 },
  noDataText: {
    fontSize: 18,
    color: 'gray',
    textAlign: 'center',
  },
  pageTitleText: {
    fontSize: 20,
    color: '#000',
    fontWeight: 'bold',
    paddingBottom: 20,
  }
});

export default DashboardCards;
