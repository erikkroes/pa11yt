Specification: Color

When a new color is created
  - it is added to the samples array
  - it is set to XYZ-white, 

When a new color is added to the samples array
  - A new array is added with XYZ, HEX, Contrast-ratio
  - A new sample is added to the interface, before the add-button

When a color is set with an XYZ color
  - all color spaces, and their settings are calculated from XYZ-white,
  - all visuals are updated
    - Sliders and inputs for each color space
    - main input
    - background color
  - the contrast with all colors in the array is calculated

When a color is set with a non-XYZ color
  - convert the color to XYZ
  - set the color with XYZ

When a color is updated
  - it is set with a non-XYZ color

When a sample is selected
  - set the color with the XYZ
  - set selected to new arrayindex

When selected is set
  - Remove the selected state from previous sample
  - Set the selected state on current sample

When a color is removed 
  - Remove the sample from the array
  - Remove the sample from the interface
  - Set selected to the sample with the same N, or otherwise N - 1

