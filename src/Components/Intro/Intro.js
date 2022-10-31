import React from 'react';
import EduImage from '../../Assets/EduImage.png';
import './Intro.css';

export default function Intro() {
  return (
    <section className='rounded border-5 intro_section'>
      <div className='container-fluid'>
        <div className='row '>
            <div className='col-md-7 col-sm-7 my-2'>
                <img src={EduImage} className='img-fluid homeImage rounded'/>
            </div>
            <div className='col-md-5 col-sm-5 my-2'>
                <h4 className='lh-lg text-center py-3 px-5'>An Education Management Information System (EMIS) is described as a system that gathers, monitors, maintains, analyzes, and disseminates data on educational inputs, processes, and outcomes—in particular, student learning.</h4>
            </div>
        </div>
      </div>
    </section>
  )
}