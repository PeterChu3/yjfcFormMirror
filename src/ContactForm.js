import React, { useState } from 'react';
import './ContactForm.css';

const checklistItems = [
  "Airworthiness Cert.",
  "Registration",
  "РОН",
  "G1000 Cockpit Ref Guide",
  "Flight Manual Sup",
  "Weight & Balance",
  "Checklist",
  "Hobbs Sheets",
  "Control Lock",
  "Foggles",
  "Tire Pressure Gage",
  "Pitot Tube Cover",
  "Headsets (1)",
  "Tow Bar",
  "Clean Windshield",
  "Pledge - Wings/ Cowl",
  "Fuel Drain Cup",
  "Fuel Dip Stick",
  "Spare Oil (3 qts)",
  "Oil Funnel Box",
  "Paper Towels",
  "Windshield Cleaner",
  "Airsickness Bags",
  "Airframe Logbook",
  "Engine Logbook",
  "Propeller Logbook",
  "Sets of Keys (Qty)",
  "Remove Trash"
];
const lightsChecklistItems = [
  "Left (red)",
  "Right (green)",
  "Tail (white)",
  "Beacon",
  "Strobes",
  "Landing",
  "Taxi",
  "Inst. Flood",
  "Inst. Internal",
  "Radio",
  "Radio Indicators",
  "Glare Shield",
  "Pedestal",
  "Door Post",
  "Cabin Dome"
];
const charts = [
  { name: "Atlanta Sectional Aeronautical Chart", key: "atlantaSectional" },
  { name: "Atlanta VFR Terminal Area Chart", key: "atlantaVFR" },
  { name: "Chart Supplement - Southeast U.S.", key: "chartSupplement" },
  { name: "L-17 IFR Enroute Low Altitude Chart", key: "L17IFR", visibleFor: ["N161GT [P]", "N885GT [S]"] },
  { name: "Southeast U.S. Terminal Procedures", key: "southeastUSTerminal", visibleFor: ["N161GT [P]", "N885GT [S]"] },
  { name: "GPS Database Due Date", key: "gpsDatabase" }
];
const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    aircraft: 'N161GT [P]', // Default selected radio button
    date: '', // Date field
    tach: '', // Date field
    hobbs: '', // Date field
    oilLevel: '', // Oil level field
    oilAdded: 'no', // Oil added field
    addedQuarts: '', // Number of quarts added field
    chartsData: charts.reduce((acc, chart) => {
      acc[chart.key] = { expirationDate: "", missing: false };
      return acc;
    }, {}),
    leftMain: '',
    rightMain: '',
    nose: ''
    ,
    tireComments: ''
    ,
    checklist: checklistItems.reduce((acc, item) => {
      acc[item] = false;
      return acc;
    }, {}),
    lightsChecklist: lightsChecklistItems.reduce((acc, item) => {
      acc[item] = false;
      return acc;
    }, {}),
    interiorComments: '',
    exteriorComments: '',
    itemComments: ''
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name.startsWith('chart*')) {
      const chartName = name.split('*')[1];
      setFormData({
        ...formData,
        charts: {
          ...formData.charts,
          [chartName]: value,
        }
      });
    } else if (name.startsWith('checklist*')) {
      const itemName = name.split('*')[1];
      setFormData({
        ...formData,
        checklist: {
          ...formData.checklist,
          [itemName]: checked
        }
      });
    } else if (type === 'checkbox') {
      setFormData({
        ...formData,
        lightsChecklist: {
          ...formData.lightsChecklist,
          [name]: checked,
        }
      });
    }
    else {
      setFormData({ ...formData, [name]: value });
    }
  };
  const handleChartChange = (key, field, value) => {
    setFormData({
      ...formData,
      chartsData: {
        ...formData.chartsData,
        [key]: {
          ...formData.chartsData[key],
          [field]: value,
        },
      },
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Name: " + formData.name + "\nAircraft: " + formData.aircraft);
    console.log("Form Data: ", formData);
  };
  const getIdealPSI = () => {
    if (formData.aircraft === 'N2247T [C182T]') {
      return { leftRightMain: 42, nose: 49 };
    } else {
      return { leftRightMain: 38, nose: 45 };
    }
  };
  const idealPSI = getIdealPSI();
  return (
    <div>
      <header className="header">
        <h1>YJFC Inspection Checklist</h1>
      </header>
      <form className="contact-form" onSubmit={handleSubmit}>
        {/* Div for Name */}
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        {/* Div for Date */}
        <div className="form-group">
          <label htmlFor="date">Date:</label>
          <input
            type="date"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />
        </div>
        {/* Div for Aircraft radio buttons */}
        <div className="form-group">
          <label htmlFor="aircraft">Select Aircraft:</label>
          <div className="radio-group">
            <label>
              <input
                type="radio"
                name="aircraft"
                value="N161GT [P]"
                checked={formData.aircraft === 'N161GT [P]'}
                onChange={handleChange}
              />
              N161GT [P]
            </label>
            <label>
              <input
                type="radio"
                name="aircraft"
                value="N314GT [P]"
                checked={formData.aircraft === 'N314GT [P]'}
                onChange={handleChange}
              />
              N314GT [P]
            </label>
            <label>
              <input
                type="radio"
                name="aircraft"
                value="N885GT [S]"
                checked={formData.aircraft === 'N885GT [S]'}
                onChange={handleChange}
              />
              N885GT [S]
            </label>
            <label>
              <input
                type="radio"
                name="aircraft"
                value="N9522L [P]"
                checked={formData.aircraft === 'N9522L [P]'}
                onChange={handleChange}
              />
              N9522L [P]
            </label>
            <label>
              <input
                type="radio"
                name="aircraft"
                value="N2247T [C182T]"
                checked={formData.aircraft === 'N2247T [C182T]'}
                onChange={handleChange}
              />
              N2247T [C182T]
            </label>
          </div>
        </div>
        {/* Div for Tach Time */}
        <div className="form-group">
          <label htmlFor="tach">Tach Time:</label>
          <input
            type="number"
            id="tach"
            name="tach"
            inputMode="decimal"
            value={formData.tach}
            onChange={handleChange}
            required
            min="0"
            step=".1"
          />
        </div>
        {/* Div for Hobbs Time */}
        <div className="form-group">
          <label htmlFor="hobbs">Hobbs Time:</label>
          <input
            type="number"
            id="hobbs"
            name="hobbs"
            inputMode="decimal"
            value={formData.hobbs}
            onChange={handleChange}
            required
            min="0"
            step=".1"
          />
        </div>
        {/* Div for Oil Section */}
        <div className="form-group">
          <h2>Oil Section</h2>
          <label htmlFor="oilLevel">Current Oil Level (Quarts):</label>
          <input
            type="number"
            id="oilLevel"
            name="oilLevel"
            inputMode="decimal"
            value={formData.oilLevel}
            onChange={handleChange}
            required
            min="0"
            step=".1"
          />
        </div>
        <div className="form-group">
          <label htmlFor="oilAdded">Was Oil Added?</label>
          <div className="radio-group">
            <label>
              <input
                type="radio"
                name="oilAdded"
                value="yes"
                checked={formData.oilAdded === 'yes'}
                onChange={handleChange}
              />
              Yes
            </label>
            <label>
              <input
                type="radio"
                name="oilAdded"
                value="no"
                checked={formData.oilAdded === 'no'}
                onChange={handleChange}
              />
              No
            </label>
          </div>
        </div>
        {formData.oilAdded === 'yes' && (
          <div className="form-group">
            <label htmlFor="addedQuarts">How many quarts?</label>
            <input
              type="number"
              id="addedQuarts"
              name="addedQuarts"
              inputMode="decimal"
              value={formData.addedQuarts}
              onChange={handleChange}
              required
              min="0"
              step=".1"
            />
          </div>
        )}
        {/* Div for Charts Section */}
        <div className="charts-section">
          <h2>Charts Section Expiration Date</h2>
          {charts.map((chart) => {
            // Only show "L-17 IFR" and "Southeast U.S. Terminal Procedures" for specific aircraft
            if (chart.visibleFor && !chart.visibleFor.includes(formData.aircraft)) {
              return null;
            }
            return (
              <div key={chart.key} className="chart-item">
                <label>{chart.name}</label>
                <div className="chart-controls">
                  {/* Expiration Date Input */}
                  <input
                    type="date"
                    value={formData.chartsData[chart.key].expirationDate}
                    onChange={(e) =>
                      handleChartChange(chart.key, "expirationDate", e.target.value)
                    }
                    disabled={formData.chartsData[chart.key].missing} // Disable if marked as missing
                  />

                  {/* Missing Checkbox */}
                  <label className="missing-checkbox">
                    <input
                      type="checkbox"
                      checked={formData.chartsData[chart.key].missing}
                      onChange={(e) =>
                        handleChartChange(chart.key, "missing", e.target.checked)
                      }
                    />
                    Missing
                  </label>
                </div>
              </div>
            );
          })}
        </div>
        {/* Div for Checklist Section */}
        <div className="checklist-section">
          <h2>Checklist</h2>
          <div className="table-wrapper">

            {checklistItems.map(item => (
              ((formData.aircraft === 'N2247T [C182T]') || item !== 'G1000 Cockpit Ref Guide') && (
                <label>
                  <div key={item} className="checklist-item">
                    <input
                      type="checkbox"
                      name={`checklist*${item}`}
                      checked={formData.checklist[item]}
                      onChange={handleChange}
                    />

                    <p htmlFor={`checklist*${item}`}>{item}</p>
                  </div>
                </label>
              )
            ))}
          </div>
        </div>
        {/* Div for Tires Section */}
        <div className="tires-section">
          <h2>Tires</h2>
          <label>
            Left Main (Ideal PSI: {idealPSI.leftRightMain}):
            <input
              type="number"
              name="leftMain"
              inputMode="numeric"
              value={formData.leftMain}
              onChange={handleChange}
              required
              min="0"
              step="1"
            />
          </label>
          <label>
            Right Main (Ideal PSI: {idealPSI.leftRightMain}):
            <input
              type="number"
              name="rightMain"
              inputMode="numeric"
              value={formData.rightMain}
              onChange={handleChange}
              required
              min="0"
              step="1"
            />
          </label>
          <label>
            Nose (Ideal PSI: {idealPSI.nose}):
            <input
              type="number"
              name="nose"
              inputMode="numeric"
              value={formData.nose}
              onChange={handleChange}
              required
              min="0"
              step="1"
            />
          </label>
          {/* Tire Inspection Comments */}
          <label>
            Tire Inspection Comments (e.g.: Slick, Flat Spots, Etc.):
            <input
              type="text"
              name="tireComments"
              value={formData.tireComments}
              onChange={handleChange}

            />
          </label>
        </div>
        {/* Div for Caution Section */}
        <div className="caution-message">
          <h1>⚠️</h1>
          <br />
          <strong><u>CAUTION: Always clear the propeller before turning on the master switch.</u></strong>
        </div>
        {/* Div for Lights Section */}
        <div className="lights-checklist-section">
          <h2>Lights Checklist</h2>
          <div className="table-wrapper">

            {lightsChecklistItems.map(item => (
              <label>
                <div key={item} className="checklist-item">
                  <input
                    type="checkbox"
                    name={item}
                    checked={formData.lightsChecklist[item]}
                    onChange={handleChange}
                  />
                  <p>{item}</p>
                </div>
              </label>
            ))}
          </div>
        </div>
        <h2>General Condition and Comments</h2>
        {/* Div for Comments Section */}
        <div className="form-group">
          <label htmlFor="interiorComments">Interior:</label>
          <input
            type="text"
            id="interiorComments"
            name="interiorComments"
            value={formData.interiorComments}
            onChange={handleChange}

          />
        </div>
        <div className="form-group">
          <label htmlFor="exteriorComments">Exterior:</label>
          <input
            type="text"
            id="exteriorComments"
            name="exteriorComments"
            value={formData.exteriorComments}
            onChange={handleChange}

          />
        </div>
        <div className="form-group">
          <label htmlFor="itemComments">Items Requiring Immediate Attention: New Squawks, Outstanding Squawks, Squawks to be Cleared, etc.</label>
          <input
            type="text"
            id="itemComments"
            name="itemComments"
            value={formData.itemComments}
            onChange={handleChange}

          />
        </div>

        <button type="submit" className="submit-button">Submit</button>
      </form>
    </div>
  );
};

export default ContactForm;