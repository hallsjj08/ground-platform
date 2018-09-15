/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import React from "react";
import "./index.css";
import { compose } from "redux";
import { connect } from "react-redux";
import { withHandlers } from "recompose";
import { getLocalizedText, updateProject } from "../../datastore.js";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import GndInlineEdit from "../gnd-inline-edit";
import { withStyles } from "@material-ui/core/styles";
import { withFirebase, withFirestore } from "react-redux-firebase";
import GndMarkerImage from "../gnd-marker-image";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

const styles = theme => ({
  tabs: {
    flexGrow: 1
  }
});

class GndFeatureTypeEditor extends React.Component {
  state = {
    formIndex: 0
  };

  handleClose = () => {
    this.props.close();
  };

  handleTabChange = (event, value) => {
    this.setState({ formIndex: value });
  };

  handleSave = event => {
    // try {
    //   this.props
    //     .updateProject(this.state.projectId, JSON.parse(this.state.project))
    //     .then(ref => this.props.close());
    // } catch (e) {
    //   alert(e);
    // }
    // event.preventDefault();
  };

  handleLabelChange(newLabel) {}

  formTab(form) {
    return <Tab label={form.title} />;
  }

  formEditor(form) {
    return <div>{form && form.id}</div>;
  }

  render() {
    const { classes, theme, editState } = this.props;
    const id = editState && editState.id;
    const defn = editState && editState.defn;
    const forms = (defn && defn.forms) || {};
    const formsArray = Object.keys(forms).map(id => ({
      id: id,
      title: getLocalizedText(forms[id].titles),
      defn: forms[id]
    }));
    formsArray.sort((a, b) => a.title.localeCompare(b.title));
    formsArray.push({ id: "generateid", title: "New form", defn: {} });
    // TODO: Add empty template if no forms present.
    return (
      <Dialog
        open={!!editState}
        onClose={this.handleClose}
        aria-labelledby="form-dialog-title"
        fullWidth
        maxWidth="md"
      >
        <form
          noValidate
          autoComplete="off"
          onSubmit={ev => this.handleSave(ev)}
        >
          <DialogTitle>
            <div className="ft-header">
              <div className="marker-container">
                <GndMarkerImage className="marker" featureType={defn} />
              </div>
              <GndInlineEdit
                className="ft-label"
                onCommitChanges={this.handleLabelChange.bind(this)}
                value={getLocalizedText(defn && defn.itemLabel)}
                placeholder="Unnamed place type"
              />
              <div className="ft-header-caption">
                <Typography variant="caption">Place type definition</Typography>
              </div>
            </div>
          </DialogTitle>
          <DialogContent>
            <div className="tab-wrapper">
              <Tabs
                value={this.state.formIndex}
                onChange={this.handleTabChange}
                indicatorColor="primary"
                textColor="primary"
                centered
              >
                {formsArray.map(form => this.formTab(form))}
              </Tabs>
            </div>

            {this.formEditor(formsArray[this.state.formIndex])}
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              type="submit"
            >
              Save
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    );
  }
}

const mapStateToProps = (store, props) => ({
  editState: store.featureTypeEditState
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  close: () => dispatch({ type: "CLOSE_FEATURE_TYPE_EDITOR" })
});

const enhance = compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  withFirebase,
  withFirestore,
  withHandlers({
    updateProject
  }),
  withStyles(styles, { withTheme: true })
);

export default enhance(GndFeatureTypeEditor);