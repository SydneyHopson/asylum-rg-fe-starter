const rawApiDataToPlotlyReadyInfo = (view, office, data) => {
  const officeNames = [
    'Los Angeles, CA',
    'San Francisco, CA',
    'New York, NY',
    'Houston, TX',
    'Chicago, IL',
    'Newark, NJ',
    'Arlington, VA',
    'Boston, MA',
    'Miami, FL',
    'New Orleans, LA',
  ];
  let rowItem;
  let rowsForTable;

  let yearMinMax = []; //variable to set minYear and MaxYear
  for (let yearResults of data[0]['yearResults']) {
    yearMinMax.push(yearResults['fiscal_year']);
  }

  const yearByOfficeByGrant = {}; //Object that contacts year by Office by grant rate information
  for (let office of data[0]['yearResults']) {
    if (!yearByOfficeByGrant[office['fiscal_year']])
      yearByOfficeByGrant[office['fiscal_year']] = {}; //if year not existing set to empty object
    for (let yearData of office['yearData']) {
      yearByOfficeByGrant[office['fiscal_year']][yearData['office']] = {
        //assign rates to year:{office:{}}
        granted: yearData['granted'],
        adminClosed: yearData['adminClosed'],
        denied: yearData['denied'],
      };
    }
  }

  const officeData = {}; //object that holds each % as a key of array value
  for (let officeName of officeNames) {
    officeData[officeName] = {
      xYears: [],
      totals: [],
      yTotalPercentGranteds: [],
      totalPercentAdminCloseds: [],
      totalPercentDenieds: [],
    };
  }
  for (let yearResults of data[0]['yearResults']) {
    for (let yearData of yearResults['yearData']) {
      officeData[yearData['office']]['xYears'].push(yearResults['fiscal_year']);
      officeData[yearData['office']]['totals'].push(yearData['totalCases']);
      officeData[yearData['office']]['yTotalPercentGranteds'].push(
        yearData['granted']
      );
      officeData[yearData['office']]['totalPercentAdminCloseds'].push(
        yearData['adminClosed']
      );
      officeData[yearData['office']]['totalPercentDenieds'].push(
        yearData['denied']
      );
    }
  }

  if (!office || office === 'all') {
    switch (view) {
      case 'time-series':
        const rowsForAllDisplay = [];
        for (let yearResults of data[0].yearResults) {
          rowItem = {
            'Fiscal Year': yearResults.fiscal_year,
            'Total Cases': yearResults.totalCases,
            '% Granted': Number(yearResults.granted).toFixed(2),
            '% Admin Close / Dismissal': Number(
              yearResults.adminClosed
            ).toFixed(2),
            '% Denied': Number(yearResults.denied).toFixed(2),
          };
          rowsForAllDisplay.push(rowItem);
        }

        const finalData = {
          xYears: [],
          totals: [],
          yTotalPercentGranteds: [],
          totalPercentAdminCloseds: [],
          totalPercentDenieds: [],
        };
        for (let officeName of officeNames) {
          finalData['xYears'].push(officeName);
          finalData['totals'].push(officeData[officeName]['totals']);
          finalData['yTotalPercentGranteds'].push(
            officeData[officeName]['yTotalPercentGranteds']
          );
          finalData['totalPercentAdminCloseds'].push(
            officeData[officeName]['totalPercentAdminCloseds']
          );
          finalData['totalPercentDenieds'].push(
            officeData[officeName]['totalPercentDenieds']
          );
        }

        return { ...finalData, rowsForAllDisplay, officeData };

      case 'office-heat-map':
        rowsForTable = [];
        for (let yearResults of data[0].yearResults) {
          for (let officeKey of officeNames) {
            const yearData = yearResults.yearData.find(
              yearItem => yearItem.office === officeKey
            );
            if (yearData) {
              rowItem = {
                'Year [Office]': `${yearResults.fiscal_year} [${officeKey}]`,
                'Total Cases': yearData.totalCases,
                '% Granted': Number(yearData.granted).toFixed(2),
                '% Admin Close / Dismissal': Number(
                  yearData.adminClosed
                ).toFixed(2),
                '% Denied': Number(yearData.denied).toFixed(2),
              };
              rowsForTable.push(rowItem);
            }
          }
        }
        const officeHeatMapDataObject = {
          //declare helper object to construct data for heatmap plotly
          x: officeNames, //office
          y: [], //year
          z: [], //rate
        };
        for (let fiscal_year in yearByOfficeByGrant) {
          //loop through
          officeHeatMapDataObject['y'].push(fiscal_year); //include year into y axis
          let zAxisArray = []; //Array to hold each row for z axis
          for (let officeName of officeNames) {
            //loop using unique office names
            zAxisArray.push(
              yearByOfficeByGrant[fiscal_year][officeName]
                ? yearByOfficeByGrant[fiscal_year][officeName]['granted']
                : 0
            );
          }
          officeHeatMapDataObject['z'].push(zAxisArray); //push to zaxis array
        }
        return { officeHeatMapDataObject, rowsForTable };

      case 'citizenship':
        rowsForTable = [];
        for (let item of data[0].citizenshipResults) {
          rowItem = {
            Citizenship: item.citizenship,
            'Total Cases': item.totalCases,
            '% Granted': Number(item.granted).toFixed(2),
            '% Admin Close / Dismissal': Number(item.adminClosed).toFixed(2),
            '% Denied': Number(item.denied).toFixed(2),
          };
          rowsForTable.push(rowItem);
        }
        const countryGrantRateObj = {
          countries: [],
          countriesPercentGranteds: [],
        };
        for (let country of data[0]['citizenshipResults']) {
          countryGrantRateObj['countries'].push(country['citizenship']);
          countryGrantRateObj['countriesPercentGranteds'].push(
            country['granted']
          );
        }
        return {
          rowsForTable,
          countryGrantRateObj,
        };
      default:
        return {};
    }
  } else {
    const officeFilteredData = data[0]['yearResults'].filter(
      officeItem => officeItem['office'] === office
    );
    switch (view) {
      case 'time-series':
        const rowsForOfficeDisplay = [];
        for (let yearData of officeFilteredData[0]['yearData']) {
          rowItem = {
            'Fiscal Year': yearData.fiscal_year,
            'Total Cases': yearData.totalCases,
            '% Granted': Number(yearData.granted).toFixed(2),
            '% Admin Close / Dismissal': Number(yearData.adminClosed).toFixed(
              2
            ),
            '% Denied': Number(yearData.denied).toFixed(2),
          };
          rowsForOfficeDisplay.push(rowItem);
        }
        return { rowsForOfficeDisplay };

      case 'office-heat-map':
        const rowsForOfficeHeatMap = [];
        for (let yearData of officeFilteredData[0]['yearData']) {
          rowItem = {
            'Year [Office]': `${yearData.fiscal_year} [${office}]`,
            'Total Cases': yearData.totalCases,
            '% Granted': Number(yearData.granted).toFixed(2),
            '% Admin Close / Dismissal': Number(yearData.adminClosed).toFixed(
              2
            ),
            '% Denied': Number(yearData.denied).toFixed(2),
          };
          rowsForOfficeHeatMap.push(rowItem);
        }
        return { rowsForOfficeHeatMap };

      default:
        return {};
    }
  }
};

export { rawApiDataToPlotlyReadyInfo };
