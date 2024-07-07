import React, { useState } from "react";
import {
  List,
  ListItem,
  ListItemText,
  Collapse,
  Checkbox,
} from "@mui/material";
import { ExpandLess, ExpandMore } from "@mui/icons-material";

const departments = [
  {
    name: "Department 1",
    subDepartments: ["Sub-department 1.1", "Sub-department 1.2"],
  },
  {
    name: "Department 2",
    subDepartments: ["Sub-department 2.1", "Sub-department 2.2"],
  },
];

const DepartmentList: React.FC = () => {
  const [open, setOpen] = useState<{ [key: string]: boolean }>({});
  const [checked, setChecked] = useState<{ [key: string]: boolean }>({});

  const handleToggle = (department: string) => {
    setOpen({ ...open, [department]: !open[department] });
  };

  const handleCheck = (department: string, subDepartment?: string) => {
    if (subDepartment) {
      setChecked({ ...checked, [subDepartment]: !checked[subDepartment] });
    } else {
      const newChecked = { ...checked };
      departments
        .find((d) => d.name === department)
        ?.subDepartments.forEach((subDep) => {
          newChecked[subDep] = !checked[department];
        });
      newChecked[department] = !checked[department];
      setChecked(newChecked);
    }
  };

  return (
    <List>
      {departments.map((department) => (
        <React.Fragment key={department.name}>
          <ListItem button onClick={() => handleToggle(department.name)}>
            <Checkbox
              edge="start"
              checked={
                checked[department.name] ||
                department.subDepartments.every((subDep) => checked[subDep])
              }
              tabIndex={-1}
              disableRipple
              onChange={() => handleCheck(department.name)}
            />
            <ListItemText primary={department.name} />
            {open[department.name] ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={open[department.name]} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {department.subDepartments.map((subDepartment) => (
                <ListItem key={subDepartment} button>
                  <Checkbox
                    edge="start"
                    checked={checked[subDepartment]}
                    tabIndex={-1}
                    disableRipple
                    onChange={() => handleCheck(department.name, subDepartment)}
                  />
                  <ListItemText primary={subDepartment} />
                </ListItem>
              ))}
            </List>
          </Collapse>
        </React.Fragment>
      ))}
    </List>
  );
};

export default DepartmentList;
