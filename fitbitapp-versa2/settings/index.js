function Colors(props) {
  return (
    <Page>
      <Section
        title={<Text bold align="center">Settings</Text>}>
    
           <Toggle
            settingsKey="speed"
            label="Speed alert"
          />
          <Slider
          label="Alert distance"
          settingsKey="distanceSetting"
          min="100"
          max="1000"
          step="distance"
        />
     
        <Select
      settingsKey="place"
      label={"Map selection"}
      options={[
        {name: 'Italy', value: 'IT'}
      ]}
      renderItem={
          (option) =>
            <TextImageRow
              label={option.name}
            />
       }
    />
 </Section>
    </Page>
  );
}

registerSettingsPage(Colors);